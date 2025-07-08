"use client"

import { motion } from "framer-motion"
import { HeroSection } from "@/components/hero-section"
import { FeaturesGrid } from "@/components/features-grid"
import { LiveDemoSection } from "@/components/live-demo-section"
import { pageVariants } from "@/lib/animations"

export default function HomePage() {
  return (
    <motion.div variants={pageVariants} initial="hidden" animate="enter" className="min-h-screen">
      <HeroSection />
      <LiveDemoSection />
      <FeaturesGrid />
    </motion.div>
  )
}
