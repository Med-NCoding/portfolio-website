import { SKILLS } from '@/constants/data'

export default function Skills() {
  return (
    <section className="py-8 reveal">
      <p className="section-label">Skills</p>

      <div>
        {SKILLS.map((group) => (
          <p key={group.category} className="skills-row">
            <span className="skill-cat">{group.category} — </span>
            <span className="skill-list">{group.skills.join(', ')}</span>
          </p>
        ))}
      </div>

      <hr className="doc-rule mt-6" />
    </section>
  )
}
