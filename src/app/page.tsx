'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import Cursor from '@/components/Cursor'
import Hero from '@/components/sections/Hero'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Education from '@/components/sections/Education'

export default function Home() {
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
