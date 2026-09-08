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
  const [isExiting, setIsExiting] = useState(false)

  // Disable browser automatic scroll restoration and force start at (0, 0)
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])

  // Lock scrolling while on the landing intro
  useEffect(() => {
    if (!entered) {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      const prevHtml = document.documentElement.style.overflow
      const prevBody = document.body.style.overflow
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      return () => {
        document.documentElement.style.overflow = prevHtml
        document.body.style.overflow = prevBody
      }
    }
  }, [entered])

  function handleEnter() {
    setIsExiting(true)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    setTimeout(() => {
      setEntered(true)
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }, 600)
  }

  return (
    <>
      <Cursor />
      {!entered && <LandingIntro onEnter={handleEnter} />}

      {(entered || isExiting) && (
        <div
          style={{
            opacity: 1,
            transition: 'opacity 0.6s ease',
          }}
        >
          <Portfolio />
        </div>
      )}
    </>
  )
}
