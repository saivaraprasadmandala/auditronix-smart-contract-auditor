"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Scorecards } from "@/components/scorecards";
import { VulnerabilityList } from "@/components/vulnerability-list";
import { AnimatedChecklist } from "@/components/animated-checklist";
import { pageVariants } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, FileText } from "lucide-react";
import Link from "next/link";
import type { AuditResult, MetricScore } from "@/lib/types";
import { generatePDFReport } from "@/lib/pdf-export"; 
import { useRouter } from "next/navigation";


export default function DashboardPage() {
  const [auditData, setAuditData] = useState<AuditResult | null>(null);
  const [contractCode, setContractCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if there's audit data in localStorage
    const savedData = localStorage.getItem("auditResults");
    const savedContract = localStorage.getItem("contractCode");

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setAuditData(parsedData);
      } catch (error) {
        console.error("Error parsing saved audit data:", error);
      }
    }

    if (savedContract) {
      setContractCode(savedContract);
    }

    setIsLoading(false);
  }, []);

  // Extract metric scores from audit data
  const getMetricScores = (): MetricScore[] => {
    if (!auditData) return [];

    // Handle both array and object formats
    const sections = Array.isArray(auditData)
      ? auditData
      : Object.values(auditData).flat();
    const metricsSection = sections.find(
      (section) => section.section === "Metric Scores"
    );

    return (metricsSection?.details as MetricScore[]) || [];
  };

  const exportResults = async () => {
    if (!auditData) return;
    await generatePDFReport(auditData, contractCode);
  };

  const clearResults = () => {
    localStorage.removeItem("auditResults");
    localStorage.removeItem("contractCode");
    setAuditData(null);
    setContractCode("");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-900">
        <div className="space-y-4 text-center">
          <RefreshCw className="mx-auto w-8 h-8 text-emerald-400 animate-spin" />
          <p className="text-zinc-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="enter"
      className="p-4 min-h-screen sm:p-6 bg-zinc-900"
    >
      <div className="mx-auto max-w-7xl">
        {/* Mobile-first header layout */}
        <div className="mb-6 sm:mb-8">
          {/* Back button and title - mobile stacked */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:gap-4 sm:space-y-0">
              <Link href="/">
                <Button variant="ghost" size="sm" className="self-start">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  <span className="hidden sm:inline">Back to Home</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">Audit Dashboard</h1>
                <p className="mt-1 text-sm sm:text-base text-zinc-400">
                  <span className="hidden sm:inline">Comprehensive smart contract security analysis</span>
                  <span className="sm:hidden">Smart contract security analysis</span>
                </p>
              </div>
            </div>

            {/* Action buttons - mobile full width */}
            {auditData && (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button
                  onClick={exportResults}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 sm:w-auto"
                  size="sm"
                >
                  <FileText className="mr-2 w-4 h-4" />
                  <span className="hidden sm:inline">Export PDF Report</span>
                  <span className="sm:hidden">Export PDF</span>
                </Button>
                <Button onClick={clearResults} variant="outline" size="sm" className="w-full sm:w-auto">
                  <RefreshCw className="mr-2 w-4 h-4" />
                  <span className="hidden sm:inline">Clear Results</span>
                  <span className="sm:hidden">Clear</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        {auditData ? (
          <div className="space-y-6 sm:space-y-8">
            {/* Metrics Overview */}
            <div>
              <h2 className="mb-3 text-lg font-semibold text-white sm:mb-4 sm:text-xl">
                Security Metrics
              </h2>
              <Scorecards metrics={getMetricScores()} />
            </div>

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 gap-6 sm:gap-8 xl:grid-cols-2">
              <div className="space-y-4 sm:space-y-6">
                <AnimatedChecklist />
              </div>
              <div>
                <VulnerabilityList auditData={auditData} />
              </div>
            </div>
          </div>
        ) : (
          <div className="px-4 py-12 text-center sm:py-20">
            <div className="mx-auto space-y-4 max-w-md">
              <div className="flex justify-center items-center mx-auto w-12 h-12 rounded-full sm:w-16 sm:h-16 bg-zinc-800">
                <RefreshCw className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-600" />
              </div>
              <h3 className="text-lg font-semibold text-white sm:text-xl">
                No Audit Data Available
              </h3>
              <p className="text-sm sm:text-base text-zinc-400">
                Run an audit analysis from the home page to see detailed results here.
              </p>
              <Link href="/demo">
                <Button className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 sm:w-auto">
                  Run New Audit
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
