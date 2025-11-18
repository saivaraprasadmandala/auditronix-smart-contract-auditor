import { NextResponse } from 'next/server';
import { APIError } from '../types/api';
import { ContractValidationError } from '../validation/contract-validator';

export class HTTPUtils {
  static createErrorResponse(error: APIError): NextResponse {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        retryable: error.retryable,
      },
      { status: error.statusCode }
    );
  }

  static createValidationErrorResponse(error: ContractValidationError): NextResponse {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        retryable: false,
      },
      { status: error.statusCode }
    );
  }

  static createSuccessResponse(data: any): NextResponse {
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  }

  static createJSONParseErrorResponse(): NextResponse {
    return NextResponse.json(
      {
        error: 'Invalid JSON in request body',
        code: 'INVALID_JSON',
        retryable: false,
      },
      { status: 400 }
    );
  }

  static createInternalErrorResponse(error: any, isDevelopment: boolean = false): NextResponse {
    return NextResponse.json(
      {
        error: 'An unexpected error occurred during analysis',
        code: 'INTERNAL_ERROR',
        retryable: false,
        details: isDevelopment ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
