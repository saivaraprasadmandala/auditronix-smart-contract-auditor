import { type NextRequest } from "next/server";
import { AuditService } from "@/lib/services/audit-service";
import { ContractValidationError } from "@/lib/validation/contract-validator";
import { APIError } from "@/lib/types/api";
import { HTTPUtils } from "@/lib/utils/http-utils";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return HTTPUtils.createJSONParseErrorResponse();
    }

    const { contract } = body;

    // Create audit service and analyze contract
    const auditService = AuditService.create();
    const result = await auditService.analyzeContract(contract);

    return HTTPUtils.createSuccessResponse(result);

  } catch (error: any) {
    console.error("❌ Analysis failed:", {
      code: error.code || "UNKNOWN",
      message: error.message,
      statusCode: error.statusCode || 500,
    });

    // Handle validation errors
    if (error instanceof ContractValidationError) {
      return HTTPUtils.createValidationErrorResponse(error);
    }

    // Handle API errors
    if (error.code && error.statusCode && error.message) {
      return HTTPUtils.createErrorResponse(error as APIError);
    }

    // Handle unexpected errors
    const isDevelopment = process.env.NODE_ENV === 'development';
    return HTTPUtils.createInternalErrorResponse(error, isDevelopment);
  }
}
