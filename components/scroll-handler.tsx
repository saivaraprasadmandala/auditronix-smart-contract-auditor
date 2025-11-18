"use client"

import { useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"

interface ScrollHandlerProps {
  children: React.ReactNode
}

export function ScrollHandler({ children }: ScrollHandlerProps) {
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
    <div ref={liveDemoRef}>
      {children}
    </div>
  )
}
