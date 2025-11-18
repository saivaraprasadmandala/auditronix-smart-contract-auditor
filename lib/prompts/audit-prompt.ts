export class AuditPromptBuilder {
  private static readonly AUDIT_PROMPT_TEMPLATE = `Your role and goal is to be an AI Smart Contract Auditor. Your job is to perform an audit on the given smart contract. Here is the smart contract: {CONTRACT}.

Please provide the results in the following array format for easy front-end display:

[
  {
    "section": "Audit Report",
    "details": "A detailed audit report of the smart contract, covering security, performance, and any other relevant aspects."
  },
  {
    "section": "Metric Scores",
    "details": [
      {
        "metric": "Security Vulnerabilities",
        "score": 0-10,
        "description": "Reentrancy, overflow, access control issues"
      },
      {
        "metric": "Gas Optimization",
        "score": 0-10,
        "description": "Efficient loops, storage usage, function calls"
      },
      {
        "metric": "Code Quality",
        "score": 0-10,
        "description": "Readability, modularity, best practices"
      },
      {
        "metric": "Access Control",
        "score": 0-10,
        "description": "Proper permissions and role management"
      },
      {
        "metric": "Input Validation",
        "score": 0-10,
        "description": "Parameter checks and edge case handling"
      },
      {
        "metric": "Business Logic",
        "score": 0-10,
        "description": "Logic correctness and edge cases"
      },
      {
        "metric": "Upgradability",
        "score": 0-10,
        "description": "Proxy patterns and upgrade safety"
      },
      {
        "metric": "Documentation",
        "score": 0-10,
        "description": "Comments, NatSpec, and code clarity"
      }
    ]
  },
  {
    "section": "Suggestions for Improvement",
    "details": "Provide numbered suggestions (1), (2), (3), etc. for improving the smart contract in terms of security, performance, and any other identified weaknesses. Each suggestion should be on a separate line or clearly numbered."
  }
]

Thank you.`;

  static buildAuditPrompt(contract: string): string {
    return this.AUDIT_PROMPT_TEMPLATE.replace('{CONTRACT}', contract);
  }

  static getMetrics(): string[] {
    return [
      'Security Vulnerabilities',
      'Gas Optimization',
      'Code Quality',
      'Access Control',
      'Input Validation',
      'Business Logic',
      'Upgradability',
      'Documentation'
    ];
  }
}
