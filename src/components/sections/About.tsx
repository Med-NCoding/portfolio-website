import SectionHeader from '@/components/SectionHeader'
import { PERSON, EDUCATION } from '@/constants/data'

export default function About() {
  return (
    <section id="about" className="py-28">
      <div className="max-w-content mx-auto px-6">
        <SectionHeader label="// 01. About" title="Who I Am" />

        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Bio */}
          <div className="md:col-span-3 space-y-5">
            {PERSON.bio.map((paragraph, i) => (
              <p
                key={i}
                className={`font-body text-[1.05rem] text-text-muted leading-relaxed reveal reveal-delay-${i + 1}`}
              >
                {paragraph}
              </p>
            ))}

            {/* Fun stats row */}
            <div className="flex flex-wrap gap-6 pt-6 reveal reveal-delay-3">
              {[
                { value: '100+', label: 'Problems Solved' },
                { value: '4+', label: 'Projects Shipped' },
                { value: 'F \'26', label: 'UWaterloo Intake' },
              ].map(({ value, label }) => (
                <div key={label} className="group">
                  <p className="font-display text-2xl font-bold text-accent group-hover:scale-105 transition-transform">
                    {value}
                  </p>
                  <p className="font-mono text-[11px] text-text-muted tracking-widest uppercase mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education card */}
          <div className="md:col-span-2 reveal reveal-delay-2">
            <div className="glass-card p-6 hover:shadow-lg hover:shadow-accent/10 transition-shadow duration-300">
              {/* Header */}
              <div className="flex items-start gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-text-primary text-lg leading-tight">
                    {EDUCATION.school}
                  </h3>
                  <p className="font-body text-sm text-text-muted mt-0.5">{EDUCATION.faculty}</p>
                </div>
              </div>

              <div className="space-y-3">
                <Row label="Degree" value={EDUCATION.degree} />
                <Row label="Program" value={EDUCATION.program} />
                <Row label="Intake" value={EDUCATION.intake} />
                <Row label="Expected" value={EDUCATION.expectedGrad} />
              </div>

              {/* Coursework */}
              <div className="mt-5 pt-5 border-t border-highlight/40">
                <p className="font-mono text-[11px] text-text-muted tracking-widest uppercase mb-3">
                  Relevant Coursework
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {EDUCATION.coursework.map((course) => (
                    <span key={course} className="tech-tag">{course}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-mono text-[11px] text-text-muted tracking-widest uppercase">{label}</span>
      <span className="font-body text-sm font-medium text-text-primary">{value}</span>
    </div>
  )
}
