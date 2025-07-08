"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const checklistItems = [
  "Contract compilation successful",
  "Static analysis completed",
  "Vulnerability scan finished",
  "Gas optimization analysis done",
  "Security score calculated",
  "Report generation complete",
]

export function AnimatedChecklist() {
  const [completedItems, setCompletedItems] = useState<number[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setCompletedItems((prev) => {
        if (prev.length < checklistItems.length) {
          return [...prev, prev.length]
        }
        return prev
      })
    }, 800)

    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="bg-zinc-800 border-zinc-700">
      <CardHeader>
        <CardTitle className="text-white">Audit Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {checklistItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            <motion.div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                completedItems.includes(index) ? "bg-emerald-500 border-emerald-500" : "border-zinc-600"
              }`}
              animate={completedItems.includes(index) ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {completedItems.includes(index) && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </motion.div>
            <span className={`text-sm ${completedItems.includes(index) ? "text-white" : "text-zinc-400"}`}>{item}</span>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}
