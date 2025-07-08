"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Scorecards } from "@/components/scorecards"
import { VulnerabilityList } from "@/components/vulnerability-list"
import { AnimatedChecklist } from "@/components/animated-checklist"
import { pageVariants } from "@/lib/animations"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RefreshCw, FileText } from "lucide-react"
import Link from "next/link"
import type { AuditResult, MetricScore } from "@/lib/types"
import { generatePDFReport } from "@/lib/pdf-export"

export default function DashboardPage() {
  const [auditData, setAuditData] = useState<AuditResult | null>(null)
  const [contractCode, setContractCode] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if there's audit data in localStorage
    const savedData = localStorage.getItem("auditResults")
    const savedContract = localStorage.getItem("contractCode")

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setAuditData(parsedData)
      } catch (error) {
        console.error("Error parsing saved audit data:", error)
      }
    }

    if (savedContract) {
      setContractCode(savedContract)
    }

    setIsLoading(false)
  }, [])

  // Extract metric scores from audit data
  const getMetricScores = (): MetricScore[] => {
    if (!auditData) return []

    // Handle both array and object formats
    const sections = Array.isArray(auditData) ? auditData : Object.values(auditData).flat()
    const metricsSection = sections.find((section) => section.section === "Metric Scores")

    return (metricsSection?.details as MetricScore[]) || []
  }

  const exportResults = async () => {
    if (!auditData) return
    await generatePDFReport(auditData, contractCode)
  }

  const clearResults = () => {
    localStorage.removeItem("auditResults")
    localStorage.removeItem("contractCode")
    setAuditData(null)
    setContractCode("")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="w-8 h-8 animate-spin text-emerald-400 mx-auto" />
          <p className="text-zinc-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="enter" className="min-h-screen bg-zinc-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Audit Dashboard</h1>
              <p className="text-zinc-400 mt-1">Comprehensive smart contract security analysis</p>
            </div>
          </div>

          {auditData && (
            <div className="flex items-center gap-2">
              <Button onClick={exportResults} className="bg-emerald-500 hover:bg-emerald-600" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Export PDF Report
              </Button>
              <Button onClick={clearResults} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Clear Results
              </Button>
            </div>
          )}
        </div>

        {auditData ? (
          <div className="space-y-8">
            {/* Metrics Overview */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Security Metrics</h2>
              <Scorecards metrics={getMetricScores()} />
            </div>

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <AnimatedChecklist />
              </div>
              <div>
                <VulnerabilityList auditData={auditData} />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto">
                <RefreshCw className="w-8 h-8 text-zinc-600" />
              </div>
              <h3 className="text-xl font-semibold text-white">No Audit Data Available</h3>
              <p className="text-zinc-400 max-w-md mx-auto">
                Run an audit analysis from the home page to see detailed results here.
              </p>
              <Link href="/">
                <Button className="bg-emerald-500 hover:bg-emerald-600 mt-4">Run New Audit</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
