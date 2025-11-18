import { APIError } from '../types/api';

export class APIErrorFactory {
  static createAuthError(status: number): APIError {
    switch (status) {
      case 401:
        return {
          code: 'INVALID_API_KEY',
          message: 'API key is invalid or expired. Please check your Together AI API key.',
          statusCode: 401,
          retryable: false,
        };
      case 403:
        return {
          code: 'FORBIDDEN',
          message: 'Access forbidden. Your API key may not have the required permissions.',
          statusCode: 403,
          retryable: false,
        };
      default:
        return this.createUnknownError(status);
    }
  }

  static createRateLimitError(): APIError {
    return {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Rate limit exceeded. Please try again in a few minutes.',
      statusCode: 429,
      retryable: true,
    };
  }

  static createServerError(status: number): APIError {
    return {
      code: 'SERVER_ERROR',
      message: 'Together AI service is temporarily unavailable. Please try again later.',
      statusCode: 503,
      retryable: true,
    };
  }

  static createValidationError(): APIError {
    return {
      code: 'INVALID_REQUEST',
      message: 'Invalid request format or parameters.',
      statusCode: 422,
      retryable: false,
    };
  }

  static createTimeoutError(): APIError {
    return {
      code: 'TIMEOUT',
      message: 'Request timed out. The analysis is taking too long. Please try again.',
      statusCode: 408,
      retryable: true,
    };
  }

  static createNetworkError(): APIError {
    return {
      code: 'NETWORK_ERROR',
      message: 'Network error. Please check your internet connection and try again.',
      statusCode: 503,
      retryable: true,
    };
  }

  static createParseError(): APIError {
    return {
      code: 'PARSE_ERROR',
      message: 'Failed to parse AI response. The response may be malformed.',
      statusCode: 502,
      retryable: true,
    };
  }

  static createInvalidResponseError(): APIError {
    return {
      code: 'INVALID_RESPONSE',
      message: 'Invalid response format from AI service',
      statusCode: 502,
      retryable: true,
    };
  }

  static createConfigurationError(): APIError {
    return {
      code: 'SERVICE_MISCONFIGURED',
      message: 'AI service is not properly configured. Please contact support.',
      statusCode: 503,
      retryable: false,
    };
  }

  static createUnknownError(status?: number, message?: string): APIError {
    return {
      code: 'UNKNOWN_ERROR',
      message: message || 'An unexpected error occurred during analysis',
      statusCode: status || 500,
      retryable: false,
    };
  }
}
