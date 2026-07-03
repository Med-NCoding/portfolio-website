'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { PERSON } from '@/constants/data'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1))
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })
    return () => observerRef.current?.disconnect()
  }, [])

  const initials = PERSON.firstName.slice(0, 1) + 'N'

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(240,247,255,0.88)] backdrop-blur-md border-b border-highlight/40 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#"
          className="font-mono text-sm font-medium text-accent-deep tracking-widest hover:text-accent transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="w-7 h-7 rounded-md bg-accent text-white flex items-center justify-center text-xs font-bold">
              {initials}
            </span>
            <span className="hidden sm:inline text-text-primary/80">{PERSON.name}</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`font-body text-sm font-medium transition-colors relative group ${
                activeSection === href.slice(1)
                  ? 'text-accent'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {label}
              <span
                className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300 ${
                  activeSection === href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </a>
          ))}
          <a
            href={PERSON.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-1.5 rounded-full border border-accent text-accent text-sm font-medium hover:bg-accent hover:text-white transition-all duration-200"
          >
            Résumé
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-surface transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-text-primary transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-text-primary transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-text-primary transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 border-b border-highlight/40' : 'max-h-0'
        } bg-[rgba(240,247,255,0.96)] backdrop-blur-md`}
      >
        <nav className="flex flex-col gap-0.5 px-6 py-4">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`py-2.5 text-sm font-medium border-b border-surface last:border-0 transition-colors ${
                activeSection === href.slice(1) ? 'text-accent' : 'text-text-muted'
              }`}
            >
              {label}
            </a>
          ))}
          <a
            href={PERSON.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 px-4 py-2 rounded-full border border-accent text-accent text-sm font-medium text-center hover:bg-accent hover:text-white transition-all"
          >
            Résumé
          </a>
        </nav>
      </div>
    </header>
  )
}
