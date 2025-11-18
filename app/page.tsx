"use client"

import { Suspense } from "react"
import { motion } from "framer-motion"
import { HeroSection } from "@/components/hero-section"
import { FeaturesGrid } from "@/components/features-grid"
import { LiveDemoSection } from "@/components/live-demo-section"
import { pageVariants } from "@/lib/animations"
import { ScrollHandler } from "@/components/scroll-handler"

export default function HomePage() {
  return (
    <motion.div 
      variants={pageVariants} 
      initial="hidden" 
      animate="enter" 
      className="min-h-screen"
    >
      <HeroSection />
      <Suspense fallback={<div className="min-h-screen" />}>
        <ScrollHandler>
          <LiveDemoSection />
        </ScrollHandler>
      </Suspense>
      <FeaturesGrid />
    </motion.div>
  )
}
