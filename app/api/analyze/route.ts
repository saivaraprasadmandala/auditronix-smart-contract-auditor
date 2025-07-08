import { type NextRequest, NextResponse } from "next/server"

// Together AI API integration
const analyzeContract = async (contract: string, apiKey: string) => {
  try {
    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3-70b-chat-hf",
        messages: [
          {
            role: "user",
            content: `Your role and goal is to be an AI Smart Contract Auditor. Your job is to perform an audit on the given smart contract. Here is the smart contract: ${contract}.

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

Thank you.`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || `HTTP ${response.status}`)
    }

    const data = await response.json()
    const result = JSON.parse(data.choices[0].message.content)
    console.log("✅ Audit Complete")
    return result
  } catch (error: any) {
    console.error("⚠️ Error:", {
      message: error.message,
    })
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const { contract } = await request.json()

    if (!contract) {
      return NextResponse.json({ error: "Contract code is required" }, { status: 400 })
    }

    // Read the key from the environment (server-side only)
    const apiKey = process.env.TOGETHER_AI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "Together AI API key not configured" }, { status: 500 })
    }

    const result = await analyzeContract(contract, apiKey)
    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Analysis failed:", error)
    return NextResponse.json(
      {
        error: "Analysis failed",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
