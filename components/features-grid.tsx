"use client"

import { motion } from "framer-motion"
import { Shield, Zap, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Shield,
    title: "Instant Vulnerability Detection",
    description: "AI-powered analysis identifies security vulnerabilities in seconds",
    animation: "pulse",
  },
  {
    icon: Zap,
    title: "Gas Optimization Scoring",
    description: "Optimize your contracts for lower gas costs with detailed recommendations",
    animation: "progress",
  },
  {
    icon: FileText,
    title: "Audit Report Generation",
    description: "Comprehensive reports with actionable insights and remediation steps",
    animation: "document",
  },
]

export function FeaturesGrid() {
  return (
    <section className="py-20 px-6 bg-zinc-800/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16 text-white"
        >
          Powerful Features
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-zinc-800 border-zinc-700 h-full">
                <CardContent className="p-6 text-center">
                  <motion.div
                    className="mb-4 flex justify-center"
                    animate={
                      feature.animation === "pulse"
                        ? {
                            scale: [1, 1.1, 1],
                            opacity: [1, 0.8, 1],
                          }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <feature.icon className="w-12 h-12 text-emerald-400" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-zinc-300">{feature.description}</p>
                  {feature.animation === "progress" && (
                    <div className="mt-4">
                      <div className="w-full bg-zinc-700 rounded-full h-2">
                        <motion.div
                          className="bg-emerald-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "85%" }}
                          transition={{ duration: 2, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
