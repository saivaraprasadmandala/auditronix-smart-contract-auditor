import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"

export const metadata: Metadata = {
  title: "Auditronix - AI Smart Contract Auditor",
  description: "Automated security analysis for Solidity contracts",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${GeistSans.className} bg-zinc-900 text-white antialiased`}>{children}</body>
    </html>
  )
}
