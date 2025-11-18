"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Code, Lock, CheckSquare, Brain, ArrowUp, FileText } from "lucide-react"
import type { MetricScore } from "@/lib/types"

const iconMap: Record<string, any> = {
  "Security Vulnerabilities": Shield,
  "Gas Optimization": Zap,
  "Code Quality": Code,
  "Access Control": Lock,
  "Input Validation": CheckSquare,
  "Business Logic": Brain,
  Upgradability: ArrowUp,
  Documentation: FileText,
  // Fallback for old metrics
  Security: Shield,
  Performance: Zap,
  "Other Key Areas": Brain,
  "Gas Efficiency": Zap,
}

const colorMap: Record<string, string> = {
  "Security Vulnerabilities": "red",
  "Gas Optimization": "yellow",
  "Code Quality": "blue",
  "Access Control": "purple",
  "Input Validation": "green",
  "Business Logic": "indigo",
  Upgradability: "pink",
  Documentation: "cyan",
  // Fallback for old metrics
  Security: "emerald",
  Performance: "blue",
  "Other Key Areas": "purple",
  "Gas Efficiency": "yellow",
}

interface ScorecardsProps {
  metrics?: MetricScore[]
}

export function Scorecards({ metrics = [] }: ScorecardsProps) {
  // Default scores if no metrics provided
  const defaultScores = [
    { metric: "Security Vulnerabilities", score: 8.2, description: "Reentrancy, overflow, access control issues" },
    { metric: "Gas Optimization", score: 7.6, description: "Efficient loops, storage usage, function calls" },
    { metric: "Code Quality", score: 9.1, description: "Readability, modularity, best practices" },
  ]

  const displayMetrics = metrics.length > 0 ? metrics : defaultScores

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {displayMetrics.slice(0, 8).map((metric, index) => {
        const Icon = iconMap[metric.metric] || Shield
        const color = colorMap[metric.metric] || "emerald"
        const normalizedScore = metric.score > 10 ? metric.score / 10 : metric.score

        return (
          <motion.div
            key={metric.metric}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="bg-zinc-800 border-zinc-700 h-full">
              <CardHeader className="pb-2 px-4 sm:px-6">
                <CardTitle className="text-white text-xs sm:text-sm font-medium flex items-center gap-2">
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate text-xs sm:text-sm">{metric.metric}</span>
                </CardTitle>
                {(metric as any).description && (
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{(metric as any).description}</p>
                )}
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-zinc-700"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="35"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeLinecap="round"
                      className={`text-${color}-400`}
                      initial={{ strokeDasharray: "0 219.8" }}
                      animate={{
                        strokeDasharray: `${normalizedScore * 21.98} 219.8`,
                      }}
                      transition={{ duration: 2, delay: index * 0.2 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="text-lg sm:text-xl font-bold text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 + index * 0.2 }}
                    >
                      {metric.score}
                    </motion.span>
                  </div>
                </div>
                <p className="text-center text-zinc-400 text-xs sm:text-sm">{metric.score}/10</p>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
