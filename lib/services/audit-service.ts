import { AnalyzeResponse } from '../types/api';
import { ContractValidator } from '../validation/contract-validator';
import { TogetherAIService } from './together-ai-service';
import { APIErrorFactory } from '../errors/api-errors';

export class AuditService {
  private togetherAI: TogetherAIService;

  constructor(apiKey?: string) {
    if (!apiKey) {
      throw APIErrorFactory.createConfigurationError();
    }
    this.togetherAI = new TogetherAIService(apiKey);
  }

  async analyzeContract(contractCode: unknown): Promise<AnalyzeResponse[]> {
    // Validate contract input
    const validatedContract = ContractValidator.validate(contractCode);

    // Perform analysis
    const result = await this.togetherAI.analyzeContract(validatedContract);

    // Log successful completion
    console.log('✅ Audit Complete');

    return result;
  }

  static create(): AuditService {
    const apiKey = process.env.TOGETHER_AI_API_KEY;
    return new AuditService(apiKey);
  }
}
