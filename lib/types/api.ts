// API Error types
export interface APIError {
  code: string;
  message: string;
  statusCode: number;
  retryable: boolean;
}

// Request/Response types
export interface AnalyzeRequest {
  contract: string;
}

export interface AnalyzeResponse {
  section: string;
  details: any;
}

// Together AI API types
export interface TogetherAIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface TogetherAIRequest {
  model: string;
  messages: TogetherAIMessage[];
  response_format: { type: string };
  temperature: number;
}

export interface TogetherAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}
