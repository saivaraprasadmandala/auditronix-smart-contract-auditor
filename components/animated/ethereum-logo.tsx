"use client"

import { motion } from "framer-motion"

export function EthereumLogo() {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      className="w-16 h-16"
    >
      <svg viewBox="0 0 256 417" className="w-full h-full">
        <motion.path
          d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"
          fill="#343434"
          animate={{ fill: ["#343434", "#627EEA", "#343434"] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />
        <path d="M127.962 0L0 212.32l127.962 75.639V154.158z" fill="#8C8C8C" />
        <motion.path
          d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"
          fill="#3C3C3B"
          animate={{ fill: ["#3C3C3B", "#627EEA", "#3C3C3B"] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />
        <path d="M127.962 416.905v-104.718L0 236.585z" fill="#8C8C8C" />
        <path d="M127.961 287.958l127.96-75.637-127.96-58.162z" fill="#141414" />
        <path d="M0 212.32l127.96 75.638v-133.8z" fill="#393939" />
      </svg>
    </motion.div>
  )
}
