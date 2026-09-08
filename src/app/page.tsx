'use client'

import { useState, useEffect } from 'react'
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
  )
}

export default function Home() {
  const [entered, setEntered] = useState(false)
  const [portfolioVisible, setPortfolioVisible] = useState(false)

  // Prevent browser scroll restoration and ensure page starts at top
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  // Lock scrolling behind landing screen
  useEffect(() => {
    if (!entered) {
      window.scrollTo(0, 0)
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prevOverflow
      }
    }
  }, [entered])

  function handleEnter() {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    setPortfolioVisible(false)
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      setEntered(true)
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
          setPortfolioVisible(true)
        })
      })
    }, 700)
  }

  return (
    <>
      <Cursor />
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
