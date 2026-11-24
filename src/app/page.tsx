'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Cursor from '@/components/Cursor'
import { PERSON, EDUCATION, EXPERIENCE, PROJECTS, SKILLS, CONTACT, Project, Job } from '@/constants/data'

type TabType = 'work' | 'projects' | 'about'

const WORK_SUMMARIES: Record<string, { label: string; summary: string }> = {
  'exp-2': {
    label: 'now',
    summary: 'TypeScript & Python web apps for generative API workflows',
  },
  'exp-1': {
    label: 'before',
    summary: 'SwiftUI mobile app with 120+ assets, smart filtering, and cart systems',
  },
}

const PROJECT_SUMMARIES: Record<string, { label: string; summary: string }> = {
  'proj-3': {
    label: 'cli tool',
    summary: 'Differential testing CLI for Shopify themes — finds multi-variant regressions in <9 iterations (~1.2s on save) and delta-debugs 8 variants down to 1–2',
  },
  'proj-1': {
    label: 'sdk tool',
    summary: 'Cross-language SDK testing tool using OpenAPI and property-based generation to catch HTTP mismatches across TypeScript, Python, and Go SDKs. Adds automatic test-case shrinking and deterministic replay for minimal reproducible failures.',
  },
  'proj-2': {
    label: 'graphics',
    summary: 'CPU-based 3D renderer from scratch (no WebGL/Three.js) rendering a 588-triangle scene at 640×480 and 75 FPS. Cut CPU render time by 48% (2.45 ms → 1.27 ms/frame) across 14 passing Vitest tests.',
  },
}

const SKILL_LABELS: Record<string, string> = {
  Languages: 'languages',
  'Frameworks & Libraries': 'frameworks',
  'Tools & Platforms': 'tools',
  'Mathematics & CS': 'math & cs',
  'Artificial Intelligence': 'ai',
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('work')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [selectedDetail, setSelectedDetail] = useState<{
    title: string
    subtitle?: string
    tech?: string[]
    bullets: string[]
    link?: string
    linkLabel?: string
  } | null>(null)

  useEffect(() => {
    const isLight = document.documentElement.classList.contains('light')
    setTheme(isLight ? 'light' : 'dark')
  }, [])

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.add('light')
      setTheme('light')
    } else {
      document.documentElement.classList.remove('light')
      setTheme('dark')
    }
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedDetail(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const openProjectModal = (p: Project) => {
    setSelectedDetail({
      title: p.title,
      subtitle: p.tech.join(' · '),
      tech: p.tech,
      bullets: p.bullets,
      link: p.githubUrl || 'https://github.com/Med-NCoding',
      linkLabel: 'View on GitHub',
    })
  }

  const openJobModal = (j: Job) => {
    setSelectedDetail({
      title: `${j.role} @ ${j.company}`,
      subtitle: `${j.location} · ${j.dateRange}`,
      tech: j.tags,
      bullets: j.bullets,
    })
  }

  // Show Magic Hour (current) first, then Daffodil Dressup
  const orderedJobs = [...EXPERIENCE].reverse()

  return (
    <>
      <Cursor />

      <div className="min-h-screen selection:bg-[var(--surface-hover)] selection:text-[var(--accent)] text-[var(--text-primary)]">
        <main className="max-w-[700px] mx-auto px-6 pt-12 sm:pt-20 pb-20">

          {/* ── Top: Name + Theme Toggle ─────────────────────────────── */}
          <div className="animate-pop-in stagger-1 flex items-center justify-between gap-4 mb-5">
            <h1
              className="text-4xl sm:text-5xl text-[var(--text-primary)]"
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontWeight: 700,
                letterSpacing: '-0.01em',
              }}
            >
              {PERSON.name}
            </h1>

            <button
              onClick={toggleTheme}
              className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-full transition-colors"
              aria-label="Toggle theme"
              title="Toggle light / dark mode"
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              )}
            </button>
          </div>

          {/* ── Description ──────────────────────────────────────────── */}
          <p className="animate-pop-in stagger-2 text-[15px] sm:text-[16px] text-[var(--text-muted)] leading-relaxed mb-8">
            I study mathematics at the{' '}
            <span className="text-[var(--text-primary)] font-medium">
              {EDUCATION.school}
            </span>
            . I work on software engineering and machine learning, turning theoretical ideas into fast, reliable systems.
          </p>

          {/* ── Tab Bar: work · projects · about ─────────────────────── */}
          <nav
            aria-label="Sections"
            className="animate-pop-in stagger-3 flex items-center gap-6 mb-8"
          >
            {(['work', 'projects', 'about'] as TabType[]).map((tab) => {
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-1 transition-colors duration-200 text-xs sm:text-sm font-mono lowercase underline-offset-4 decoration-[var(--accent)] ${
                    isActive
                      ? 'text-[var(--accent)] font-medium underline'
                      : 'text-[var(--accent)]/60 hover:text-[var(--accent)] hover:underline'
                  }`}
                >
                  {tab}
                </button>
              )
            })}
          </nav>

          {/* ── Tab Content ──────────────────────────────────────────── */}
          <section className="animate-pop-in stagger-4 mb-12 min-h-[160px]">
            {activeTab === 'work' && (
              <div className="border-l-2 border-[var(--rule)] pl-5 space-y-5 text-sm">
                {orderedJobs.map((job) => {
                  const meta = WORK_SUMMARIES[job.id]
                  return (
                    <div
                      key={job.id}
                      className="grid grid-cols-[85px_1fr] sm:grid-cols-[100px_1fr] gap-3 items-start py-1"
                    >
                      <span className="font-mono text-xs text-[var(--text-dim)] pt-0.5 lowercase">
                        {meta?.label ?? job.dateRange}
                      </span>
                      <div className="leading-relaxed">
                        <button
                          onClick={() => openJobModal(job)}
                          className="group inline-flex flex-wrap items-center text-left gap-x-1.5 gap-y-0.5 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                        >
                          <span>{job.role.toLowerCase()} at</span>
                          <span className="inline-flex items-center gap-1.5">
                            {job.logo && (
                              <Image
                                src={job.logo}
                                alt={`${job.company} logo`}
                                width={16}
                                height={16}
                                className="inline-block w-4 h-4 rounded-[3px] object-cover shrink-0"
                              />
                            )}
                            <span className="font-medium underline decoration-[var(--rule)] underline-offset-4 group-hover:decoration-[var(--accent)]">
                              {job.company}
                            </span>
                          </span>
                          <span className="text-xs text-[var(--text-dim)] font-mono ml-0.5">↗</span>
                        </button>
                        <div className="text-xs text-[var(--text-dim)] font-mono mt-1">
                          {meta?.summary ?? `${job.location} · ${job.dateRange}`}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="border-l-2 border-[var(--rule)] pl-5 space-y-5 text-sm">
                {PROJECTS.map((proj) => {
                  const meta = PROJECT_SUMMARIES[proj.id]
                  return (
                    <div
                      key={proj.id}
                      className="grid grid-cols-[85px_1fr] sm:grid-cols-[100px_1fr] gap-3 items-start py-1"
                    >
                      <span className="font-mono text-xs text-[var(--text-dim)] pt-0.5 lowercase">
                        {meta?.label ?? 'project'}
                      </span>
                      <div className="leading-relaxed">
                        <button
                          onClick={() => openProjectModal(proj)}
                          className="group inline-flex items-baseline text-left gap-1.5 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors font-medium underline decoration-[var(--rule)] underline-offset-4 group-hover:decoration-[var(--accent)]"
                        >
                          <span>{proj.title}</span>
                          <span className="text-xs text-[var(--text-dim)] font-mono">↗</span>
                        </button>
                        <div className="text-xs text-[var(--text-dim)] font-mono mt-1">
                          {meta?.summary ?? proj.tech.join(' · ')}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {activeTab === 'about' && (
              <div className="border-l-2 border-[var(--rule)] pl-5 space-y-5 text-sm">
                <div className="grid grid-cols-[85px_1fr] sm:grid-cols-[100px_1fr] gap-3 items-start py-1">
                  <span className="font-mono text-xs text-[var(--text-dim)] pt-0.5 lowercase">
                    education
                  </span>
                  <div className="leading-relaxed text-[var(--text-muted)]">
                    <span className="text-[var(--text-primary)] font-medium">
                      {EDUCATION.degree}
                    </span>{' '}
                    at {EDUCATION.school}
                    <div className="text-xs text-[var(--text-dim)] font-mono mt-1">
                      {EDUCATION.faculty} · {EDUCATION.intake} – {EDUCATION.expectedGrad}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-[85px_1fr] sm:grid-cols-[100px_1fr] gap-3 items-start py-1">
                  <span className="font-mono text-xs text-[var(--text-dim)] pt-0.5 lowercase">
                    coursework
                  </span>
                  <div className="leading-relaxed text-[var(--text-muted)] text-xs sm:text-sm">
                    {EDUCATION.coursework.join(' · ')}
                  </div>
                </div>

                {SKILLS.map((grp) => (
                  <div
                    key={grp.category}
                    className="grid grid-cols-[85px_1fr] sm:grid-cols-[100px_1fr] gap-3 items-start py-1"
                  >
                    <span className="font-mono text-xs text-[var(--text-dim)] pt-0.5 lowercase">
                      {SKILL_LABELS[grp.category] ?? grp.category.toLowerCase()}
                    </span>
                    <div className="leading-relaxed text-[var(--text-muted)] text-xs sm:text-sm">
                      {grp.skills.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── Bottom Links ─────────────────────────────────────────── */}
          <footer className="animate-pop-in stagger-5 pt-4">
            <div className="flex flex-wrap items-center gap-5">
              {CONTACT.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-mono text-[var(--accent)] hover:underline underline-offset-4 decoration-[var(--accent)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </footer>

        </main>
      </div>

      {/* ── Detail Modal for Fast Deep-Dives ─────────────────────────── */}
      {selectedDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-pop-in"
          onClick={() => setSelectedDetail(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-[560px] max-h-[85vh] overflow-y-auto rounded-xl bg-[var(--surface)] border border-[var(--card-border)] p-6 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-xl font-playfair font-bold text-[var(--text-primary)]">
                  {selectedDetail.title}
                </h3>
                {selectedDetail.subtitle && (
                  <p className="font-mono text-xs text-[var(--accent)] mt-0.5">
                    {selectedDetail.subtitle}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedDetail(null)}
                className="text-[var(--text-dim)] hover:text-[var(--text-primary)] p-1 text-sm font-mono"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <ul className="list-disc list-outside pl-4 space-y-2 text-sm text-[var(--text-muted)] my-4 leading-relaxed font-sans">
              {selectedDetail.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>

            {selectedDetail.tech && selectedDetail.tech.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2 mb-4">
                {selectedDetail.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--bg)] text-[var(--accent)] border border-[var(--card-border)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {selectedDetail.link && (
              <div className="pt-2 border-t border-[var(--rule)]/60 flex justify-end">
                <a
                  href={selectedDetail.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--accent)] text-black text-xs font-mono font-medium hover:opacity-90 transition-opacity"
                >
                  <span>{selectedDetail.linkLabel || 'Visit'}</span>
                  <span>↗</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
