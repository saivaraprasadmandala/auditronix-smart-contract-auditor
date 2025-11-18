"use client"

import { useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { HeroSection } from "@/components/hero-section"
import { FeaturesGrid } from "@/components/features-grid"
import { LiveDemoSection } from "@/components/live-demo-section"
import { pageVariants } from "@/lib/animations"

export default function HomePage() {
  const searchParams = useSearchParams()
  const liveDemoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = searchParams.get('section')
    if (section === 'live-demo' && liveDemoRef.current) {
      // Smooth scroll to the live demo section
      setTimeout(() => {
        liveDemoRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }, 500) // Small delay to ensure page is loaded
    }
  }, [searchParams])

  return (
    <motion.div 
      variants={pageVariants} 
      initial="hidden" 
      animate="enter" 
      className="min-h-screen"
    >
      <HeroSection />
      <div ref={liveDemoRef}>
        <LiveDemoSection />
      </div>
      <FeaturesGrid />
    </motion.div>
  )
}
