'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import Cursor from '@/components/Cursor'
import Hero from '@/components/sections/Hero'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Education from '@/components/sections/Education'
import LandingIntro from '@/components/LandingIntro'

function Portfolio() {
  useScrollReveal()
  return (
    <>
      <Cursor />
      <main className="max-w-content mx-auto px-6">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <footer className="py-10 text-text-muted" style={{ fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
          Medhansh Negi · {new Date().getFullYear()}
        </footer>
      </main>
    </>
  )
}

export default function Home() {
  const [entered, setEntered] = useState(false)
  const [portfolioVisible, setPortfolioVisible] = useState(false)

  function handleEnter() {
    // Portfolio starts invisible, then fades in after intro is gone
    setPortfolioVisible(false)
    setTimeout(() => {
      setEntered(true)
      // Tiny delay so the DOM mounts, then fade in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPortfolioVisible(true))
      })
    }, 700)
  }

  return (
    <>
      {!entered && <LandingIntro onEnter={handleEnter} />}

      <div
        style={{
          opacity:    portfolioVisible ? 1 : 0,
          transform:  portfolioVisible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          visibility:  entered ? 'visible' : 'hidden',
        }}
      >
        <Portfolio />
      </div>
    </>
  )
}
