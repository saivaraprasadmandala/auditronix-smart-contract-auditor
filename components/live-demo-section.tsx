"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CodeEditor } from "@/components/code-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { DEMO_CONTRACT } from "@/lib/constants";
import type { AuditResult } from "@/lib/types";
import Link from "next/link";

export function LiveDemoSection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [auditResults, setAuditResults] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [contract, setContract] = useState(DEMO_CONTRACT);


  const handleRunAudit = async () => {
    setIsAnalyzing(true);
    setShowResults(false);
    setError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contract,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setAuditResults(data);
      setShowResults(true);

      // Save to localStorage for dashboard
      localStorage.setItem("auditResults", JSON.stringify(data));
      localStorage.setItem("contractCode", contract);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatSuggestions = (content: unknown) => {
    if (!content) {
      return <p className="text-sm text-zinc-400">No suggestions available</p>;
    }

    let text: string;
    if (typeof content === "string") {
      text = content;
    } else {
      text = JSON.stringify(content, null, 2);
    }

    text = text.trim();

    // Check for (1), (2), (3) format first
    const parenthesesPattern = text.match(/\(\d+\)[^(]*/g);
    if (parenthesesPattern && parenthesesPattern.length > 1) {
      return parenthesesPattern
        .map((suggestion, index) => {
          // Remove the (1), (2), etc. from the beginning and clean up
          const cleanSuggestion = suggestion.replace(/^\(\d+\)\s*/, "").trim();
          if (!cleanSuggestion) return null;
          return (
            <div
              key={index}
              className="flex gap-3 p-3 mb-3 rounded-lg border bg-zinc-800/50 border-zinc-700/50"
            >
              <div className="flex flex-shrink-0 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-emerald-500 rounded-full">
                {index + 1}
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">
                {cleanSuggestion}
              </p>
            </div>
          );
        })
        .filter(Boolean);
    }

    // Check for $$1$$, $$2$$, $$3$$ format
    const numberedPattern = text.match(/\$\$\d+\$\$[^$]*/g);
    if (numberedPattern && numberedPattern.length > 1) {
      return numberedPattern
        .map((suggestion, index) => {
          const cleanSuggestion = suggestion.replace(/\$\$\d+\$\$\s*/, "").trim();
          if (!cleanSuggestion) return null;
          return (
            <div
              key={index}
              className="flex gap-3 p-3 mb-3 rounded-lg border bg-zinc-800/50 border-zinc-700/50"
            >
              <div className="flex flex-shrink-0 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-emerald-500 rounded-full">
                {index + 1}
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">
                {cleanSuggestion}
              </p>
            </div>
          );
        })
        .filter(Boolean);
    }

    // Check for numbered list format: "1.", "2.", "3."
    const numberedListPattern = text.match(/\d+\.[^0-9]*/g);
    if (numberedListPattern && numberedListPattern.length > 1) {
      return numberedListPattern
        .map((suggestion, index) => {
          const cleanSuggestion = suggestion.replace(/^\d+\.\s*/, "").trim();
          if (!cleanSuggestion) return null;
          return (
            <div
              key={index}
              className="flex gap-3 p-3 mb-3 rounded-lg border bg-zinc-800/50 border-zinc-700/50"
            >
              <div className="flex flex-shrink-0 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-emerald-500 rounded-full">
                {index + 1}
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">
                {cleanSuggestion}
              </p>
            </div>
          );
        })
        .filter(Boolean);
    }

    // Fallback to sentence splitting (only if no numbered patterns found)
    const sentences = text.split(/\.\s+/).filter((s) => s.trim() && s.length > 10);
    if (sentences.length > 1) {
      return sentences.map((sentence, index) => (
        <div
          key={index}
          className="flex gap-3 p-3 mb-3 rounded-lg border bg-zinc-800/50 border-zinc-700/50"
        >
          <div className="flex flex-shrink-0 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-emerald-500 rounded-full">
            {index + 1}
          </div>
          <p className="text-sm leading-relaxed text-zinc-300">
            {sentence.trim()}.
          </p>
        </div>
      ));
    }

    // If no patterns match, display as single block
    return (
      <div className="p-4 rounded-lg border bg-zinc-800/50 border-zinc-700/50">
        <p className="text-sm leading-relaxed text-zinc-300">{text}</p>
      </div>
    );
  };

  const renderAuditResults = () => {
    if (!auditResults) return null;

    const sections = Array.isArray(auditResults)
      ? auditResults
      : Object.values(auditResults).flat();

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-y-auto space-y-6 max-h-96"
      >
        {sections.map((section, index) => (
          <div key={index} className="space-y-3">
            <div className="flex gap-2 items-center">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <h4 className="text-lg font-semibold text-emerald-400">
                {section.section}
              </h4>
            </div>

            {section.section === "Metric Scores" ? (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {Array.isArray(section.details) &&
                  section.details.map((metric: any, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-3 rounded-lg border bg-zinc-900 border-zinc-700"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="text-sm font-medium text-zinc-300">
                            {metric.metric || "Unknown Metric"}
                          </span>
                          {metric.description && (
                            <p className="mt-1 text-xs text-zinc-500">
                              {metric.description}
                            </p>
                          )}
                        </div>
                        <span className="text-lg font-bold text-white">
                          {metric.score || 0}/10
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-zinc-700">
                        <motion.div
                          className={`h-2 rounded-full ${
                            (metric.score || 0) >= 8
                              ? "bg-emerald-400"
                              : (metric.score || 0) >= 6
                              ? "bg-yellow-400"
                              : "bg-red-400"
                          }`}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${((metric.score || 0) / 10) * 100}%`,
                          }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
              </div>
            ) : section.section === "Suggestions for Improvement" ? (
              <div className="p-4 rounded-lg border bg-zinc-900 border-zinc-700">
                <div className="space-y-2">
                  {formatSuggestions(section.details)}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-lg border bg-zinc-900 border-zinc-700">
                <div className="max-w-none prose prose-invert">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-zinc-300">
                    {typeof section.details === "string"
                      ? section.details
                      : JSON.stringify(section.details, null, 2)}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-20" data-section="live-demo">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center items-center mb-8 space-y-4 text-center sm:mb-10"
        >
          <h2 className="px-2 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Test contracts live • See full results in Audit Dashboard
          </h2>

          <Link href="/dashboard">
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 sm:w-auto">
              Go to Audit Dashboard
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 xl:grid-cols-2">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle className="flex flex-col gap-3 items-start text-white sm:flex-row sm:items-center sm:gap-2">
                <span className="text-lg sm:text-xl">Smart Contract Editor</span>
                <Button
                  onClick={handleRunAudit}
                  disabled={isAnalyzing}
                  className="w-full text-sm bg-emerald-500 sm:w-auto sm:ml-auto hover:bg-emerald-600 disabled:opacity-50 sm:text-base"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      <span className="hidden sm:inline">Analyzing with LLaMA-3...</span>
                      <span className="sm:hidden">Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 w-4 h-4" />
                      Run AI Audit
                    </>
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CodeEditor
                code={contract}
                isAnalyzing={isAnalyzing}
                onChange={setContract}
                editable={!isAnalyzing}
              />
            </CardContent>
          </Card>

          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle className="flex flex-col gap-2 items-start text-white sm:flex-row sm:items-center">
                <span className="text-lg sm:text-xl">AI Analysis Results</span>
                {isAnalyzing && (
                  <div className="flex gap-2 items-center text-emerald-400 sm:ml-auto">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Processing...</span>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="flex flex-col justify-center items-center space-y-4 h-64">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <Loader2 className="w-12 h-12 text-emerald-400" />
                  </motion.div>
                  <div className="px-4 space-y-2 text-center">
                    <p className="text-base font-medium text-emerald-400 sm:text-lg">
                      AI Analysis in Progress
                    </p>
                    <p className="text-sm sm:text-base text-zinc-400">
                      LLaMA-3 is analyzing your smart contract...
                    </p>
                    <div className="flex gap-1 justify-center items-center mt-4">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-emerald-400 rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : error ? (
                <div className="flex flex-col justify-center items-center px-4 space-y-4 h-64">
                  <AlertCircle className="w-12 h-12 text-red-400" />
                  <div className="space-y-2 text-center">
                    <p className="text-base font-medium text-red-400 sm:text-lg">Analysis Failed</p>
                    <p className="text-sm break-words sm:text-base text-zinc-400">{error}</p>
                  </div>
                  <Button onClick={handleRunAudit} variant="outline" size="sm">
                    Try Again
                  </Button>
                </div>
              ) : showResults && auditResults ? (
                renderAuditResults()
              ) : (
                <div className="flex flex-col justify-center items-center px-4 space-y-4 h-64 text-zinc-500">
                  <div className="space-y-2 text-center">
                    <p className="text-base font-medium sm:text-lg">Ready for Analysis</p>
                    <p className="text-sm sm:text-base">
                      Click "Run AI Audit" to analyze your smart contract
                    </p>
                  </div>
                  <div className="flex gap-2 items-center text-xs text-zinc-600">
                    <span>Powered by</span>
                    <span className="px-2 py-1 font-mono rounded bg-zinc-700">
                      LLaMA-3-70B
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
