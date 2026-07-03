'use client'

import { EXPERIENCE } from '@/constants/data'

export default function Experience() {
  return (
    <section className="py-12 reveal">
      {/* Section label */}
      <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-8">
        {"// experience"}
      </h2>

      <div className="relative pl-1">
        {/* Timeline 2px vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[var(--surface)]" />

        <div className="space-y-8">
          {EXPERIENCE.map((entry) => (
            <div key={entry.id} className="relative pl-8 group">
              {/* Timeline Dot */}
              <div className="absolute left-0 top-[22px] w-4 h-4 rounded-full bg-[var(--bg)] border-2 border-[var(--surface)] group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] transition-all duration-300 -translate-x-[2px]" />

              {/* Entry Card */}
              <div className="p-6 rounded-lg bg-[var(--surface)]/30 border-l-4 border-transparent group-hover:border-[var(--accent)] group-hover:bg-[var(--surface)] hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300">
                <h3 className="font-playfair font-semibold text-lg text-[var(--text-primary)] mb-1">
                  {entry.role}
                </h3>
                <div className="font-mono text-xs text-[var(--text-muted)] mb-4">
                  {entry.company} &middot; {entry.location} &middot; {entry.dateRange}
                </div>
                <ul className="list-disc list-outside pl-4 space-y-2 text-sm text-[var(--text-muted)] font-dmsans">
                  {entry.bullets.map((bullet, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="doc-rule mt-12" />
    </section>
  )
}
