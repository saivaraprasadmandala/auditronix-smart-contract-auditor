"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { EthereumLogo } from "@/components/animated/ethereum-logo"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="flex overflow-hidden relative justify-center items-center min-h-screen">
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
      <div className="absolute right-4 top-10 opacity-50 sm:top-20 sm:right-20 sm:opacity-100">
        <div className="scale-50 sm:scale-75 md:scale-100">
          <EthereumLogo />
        </div>
      </div>

      <div className="relative z-10 px-4 mx-auto max-w-4xl text-center sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 text-3xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-400 sm:mb-6 sm:text-4xl md:text-6xl lg:text-7xl"
        >
          Auditronix: AI Smart Contract Auditor
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="px-2 mx-auto mb-6 max-w-2xl text-lg sm:mb-8 sm:text-xl md:text-2xl text-zinc-300"
        >
          Automated security analysis for Solidity contracts
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col gap-3 justify-center items-center mx-auto max-w-md sm:flex-row sm:gap-4 sm:max-w-none"
        >
          <Button
            onClick={() => {
              const liveDemoSection = document.querySelector('[data-section="live-demo"]')
              if (liveDemoSection) {
                liveDemoSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            className="px-6 py-2.5 sm:px-8 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold text-white transition-all duration-300 rounded-lg bg-emerald-500 hover:bg-emerald-600 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
          >
            Try Demo
          </Button>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="px-6 py-2.5 sm:px-8 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold text-emerald-400 border-emerald-400 hover:bg-emerald-400 hover:text-white transition-all duration-300 rounded-lg hover:scale-105"
            >
              View Dashboard
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
