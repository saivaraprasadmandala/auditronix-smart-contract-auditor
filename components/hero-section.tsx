"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { EthereumLogo } from "@/components/animated/ethereum-logo"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-emerald-900/20">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
              "linear-gradient(225deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
              "linear-gradient(45deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      {/* Floating Ethereum Logo */}
      <div className="absolute top-20 right-20">
        <EthereumLogo />
      </div>

      <div className="relative z-10 max-w-4xl px-6 mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-6xl font-bold text-transparent md:text-7xl bg-gradient-to-r from-white to-emerald-400 bg-clip-text"
        >
          Auditronix: AI Smart Contract Auditor
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto mb-8 text-xl md:text-2xl text-zinc-300"
        >
          Automated security analysis for Solidity contracts
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/dashboard">
            <Button
              size="lg"
              className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 rounded-lg bg-emerald-500 hover:bg-emerald-600 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
            >
              Try Demo
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
