'use client'

import { PROJECTS } from '@/constants/data'

export default function Projects() {
  return (
    <section className="py-12 reveal">
      {/* Section label */}
      <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-8">
        {"// projects"}
      </h2>

      {/* Grid layout: 2 columns desktop, 1 mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className="relative overflow-hidden rounded-lg bg-[var(--surface)]/40 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/60 group"
          >
            {/* Subtle top accent bar in gradient (accent → accent-deep) */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)]" />

            {/* Title */}
            <h3 className="font-playfair font-bold text-lg text-[var(--text-primary)] mb-3">
              {project.title}
            </h3>

            {/* Tech stack as pill tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="font-mono text-[10px] px-2.5 py-0.5 rounded bg-[var(--surface)] text-[var(--accent)] border border-white/5"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Bullet descriptions */}
            <ul className="list-disc list-outside pl-4 space-y-2 text-sm text-[var(--text-muted)] font-dmsans">
              {project.bullets.map((bullet, idx) => (
                <li key={idx} className="leading-relaxed">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <hr className="doc-rule mt-12" />
    </section>
  )
}
