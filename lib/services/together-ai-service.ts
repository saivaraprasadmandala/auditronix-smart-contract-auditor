import { APIError, TogetherAIRequest, TogetherAIResponse, AnalyzeResponse } from '../types/api';
import { APIErrorFactory } from '../errors/api-errors';
import { AuditPromptBuilder } from '../prompts/audit-prompt';

export class TogetherAIService {
  private static readonly API_URL = 'https://api.together.xyz/v1/chat/completions';
  private static readonly MODEL = 'meta-llama/Llama-3-70b-chat-hf';
  private static readonly TIMEOUT_MS = 60000; // 60 seconds

  constructor(private apiKey: string) {
    if (!apiKey) {
      throw APIErrorFactory.createConfigurationError();
    }
  }

  async analyzeContract(contract: string): Promise<AnalyzeResponse[]> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TogetherAIService.TIMEOUT_MS);

    try {
      const prompt = AuditPromptBuilder.buildAuditPrompt(contract);
      const requestBody = this.buildRequest(prompt);
      
      const response = await fetch(TogetherAIService.API_URL, {
        method: 'POST',
        headers: this.buildHeaders(),
        signal: controller.signal,
        body: JSON.stringify(requestBody),
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw this.handleAPIError(response);
      }

      const data: TogetherAIResponse = await response.json();
      return this.parseResponse(data);

    } catch (error: any) {
      clearTimeout(timeoutId);
      throw this.handleError(error);
    }
  }

  private buildHeaders(): Record<string, string> {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  private buildRequest(prompt: string): TogetherAIRequest {
    return {
      model: TogetherAIService.MODEL,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    };
  }

  private async handleAPIError(response: Response): Promise<APIError> {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { error: { message: 'Unknown error' } };
    }

    switch (response.status) {
      case 401:
      case 403:
        return APIErrorFactory.createAuthError(response.status);
      case 429:
        return APIErrorFactory.createRateLimitError();
      case 422:
        return APIErrorFactory.createValidationError();
      case 500:
      case 502:
      case 503:
      case 504:
        return APIErrorFactory.createServerError(response.status);
      default:
        return APIErrorFactory.createUnknownError(
          response.status,
          errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`
        );
    }
  }

  private parseResponse(data: TogetherAIResponse): AnalyzeResponse[] {
    // Validate response structure
    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      throw APIErrorFactory.createInvalidResponseError();
    }

    let result;
    try {
      result = JSON.parse(data.choices[0].message.content);
    } catch (parseError) {
      throw APIErrorFactory.createParseError();
    }

    // Validate that result is an array
    if (!Array.isArray(result)) {
      throw APIErrorFactory.createInvalidResponseError();
    }

    return result;
  }

  private handleError(error: any): APIError {
    // Handle timeout errors
    if (error.name === 'AbortError') {
      return APIErrorFactory.createTimeoutError();
    }

    // Handle network errors
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      return APIErrorFactory.createNetworkError();
    }

    // Re-throw API errors as-is
    if (error.code && error.statusCode) {
      return error;
    }

    // Handle unexpected errors
    console.error('⚠️ Unexpected Error:', {
      message: error.message,
      stack: error.stack,
    });

    return APIErrorFactory.createUnknownError(undefined, error.message);
  }
}
