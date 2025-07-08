"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CodeEditorProps {
  code: string
  isAnalyzing?: boolean
  onChange?: (code: string) => void
  editable?: boolean
}

export function CodeEditor({ code, isAnalyzing, onChange, editable = false }: CodeEditorProps) {
  const [displayedCode, setDisplayedCode] = useState("")
  const [currentLine, setCurrentLine] = useState(0)

  useEffect(() => {
    setDisplayedCode(code)
  }, [code])

  useEffect(() => {
    if (isAnalyzing) {
      const lines = code.split("\n")
      const interval = setInterval(() => {
        setCurrentLine((prev) => (prev + 1) % lines.length)
      }, 500)
      return () => clearInterval(interval)
    }
  }, [isAnalyzing, code])

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value
    setDisplayedCode(newCode)
    onChange?.(newCode)
  }

  const lines = displayedCode.split("\n")

  if (editable && !isAnalyzing) {
    return (
      <div className="relative">
        <textarea
          value={displayedCode}
          onChange={handleCodeChange}
          className="w-full h-96 bg-zinc-900 text-zinc-300 font-mono text-sm p-4 rounded-lg border border-zinc-700 focus:border-emerald-500 focus:outline-none resize-none"
          placeholder="Paste your Solidity contract here..."
        />
        <div className="absolute top-2 right-2 text-xs text-zinc-500">Editable</div>
      </div>
    )
  }

  return (
    <div className="bg-zinc-900 rounded-lg p-4 font-mono text-sm overflow-auto max-h-96">
      {lines.map((line, index) => (
        <motion.div
          key={index}
          className={`flex ${
            isAnalyzing && index === currentLine ? "bg-emerald-500/20 border-l-2 border-emerald-400" : ""
          }`}
          animate={
            isAnalyzing && index === currentLine
              ? {
                  backgroundColor: ["rgba(16, 185, 129, 0.2)", "rgba(16, 185, 129, 0.1)", "rgba(16, 185, 129, 0.2)"],
                }
              : {}
          }
          transition={{ duration: 0.5 }}
        >
          <span className="text-zinc-500 w-8 text-right mr-4 select-none">{index + 1}</span>
          <span className="text-zinc-300">
            {line.split(" ").map((word, wordIndex) => (
              <span
                key={wordIndex}
                className={
                  word.includes("function") || word.includes("contract") || word.includes("pragma")
                    ? "text-blue-400"
                    : word.includes("public") || word.includes("private") || word.includes("internal")
                      ? "text-purple-400"
                      : word.includes("uint") || word.includes("address") || word.includes("bool")
                        ? "text-emerald-400"
                        : ""
                }
              >
                {word}{" "}
              </span>
            ))}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
