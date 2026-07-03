import { EDUCATION } from '@/constants/data'

export default function Education() {
  return (
    <section className="py-8 reveal">
      <p className="section-label">Education</p>

      <div className="entry">
        <div className="entry-header">
          <span className="entry-role">{EDUCATION.degree}</span>
          <span className="entry-at">·</span>
          <span className="entry-company">{EDUCATION.school}</span>
        </div>
        <div className="entry-meta">{EDUCATION.intake} — {EDUCATION.expectedGrad} · {EDUCATION.faculty}</div>
        <div className="entry-body">
          {EDUCATION.coursework.join(', ')}.
        </div>
      </div>

      <div className="entry">
        <div className="entry-header">
          <span className="entry-role">Ontario Secondary School Diploma</span>
          <span className="entry-at">·</span>
          <span className="entry-company">St. Marcellinus Secondary School</span>
        </div>
        <div className="entry-meta">Sept 2022 — June 2026 · Mississauga, ON</div>
      </div>
    </section>
  )
}
