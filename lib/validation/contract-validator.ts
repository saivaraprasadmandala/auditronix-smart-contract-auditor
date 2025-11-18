import { APIError } from '../types/api';

export class ContractValidationError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = 'ContractValidationError';
  }
}

export class ContractValidator {
  private static readonly MAX_CONTRACT_SIZE = 50000;
  private static readonly MIN_CONTRACT_SIZE = 10;

  static validate(contract: unknown): string {
    // Check if contract exists
    if (!contract) {
      throw new ContractValidationError(
        'MISSING_CONTRACT',
        'Contract code is required'
      );
    }

    // Check if contract is string
    if (typeof contract !== 'string') {
      throw new ContractValidationError(
        'INVALID_CONTRACT_TYPE',
        'Contract code must be a string'
      );
    }

    // Check if contract is empty
    const trimmedContract = contract.trim();
    if (trimmedContract.length === 0) {
      throw new ContractValidationError(
        'EMPTY_CONTRACT',
        'Contract code cannot be empty'
      );
    }

    // Check minimum size
    if (trimmedContract.length < this.MIN_CONTRACT_SIZE) {
      throw new ContractValidationError(
        'CONTRACT_TOO_SMALL',
        `Contract code is too small (minimum ${this.MIN_CONTRACT_SIZE} characters)`
      );
    }

    // Check maximum size
    if (contract.length > this.MAX_CONTRACT_SIZE) {
      throw new ContractValidationError(
        'CONTRACT_TOO_LARGE',
        `Contract code is too large (max ${this.MAX_CONTRACT_SIZE.toLocaleString()} characters)`,
        413
      );
    }

    // Basic Solidity validation
    if (!this.isValidSolidityContract(trimmedContract)) {
      throw new ContractValidationError(
        'INVALID_SOLIDITY',
        'Contract does not appear to be valid Solidity code'
      );
    }

    return trimmedContract;
  }

  private static isValidSolidityContract(contract: string): boolean {
    // Basic checks for Solidity contract
    const solidityKeywords = [
      'pragma solidity',
      'contract ',
      'function ',
      'mapping',
      'uint',
      'address',
      'bool'
    ];

    const lowerContract = contract.toLowerCase();
    return solidityKeywords.some(keyword => lowerContract.includes(keyword));
  }
}
