interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
  centered?: boolean
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-14 reveal ${centered ? 'text-center' : ''}`}>
      <p className="font-mono text-xs font-medium text-accent tracking-[0.18em] uppercase mb-3">
        {label}
      </p>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-text-primary leading-tight">
        {title}
      </h2>
      <div className={`mt-4 h-0.5 w-12 bg-gradient-to-r from-accent to-highlight rounded ${centered ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className="mt-4 text-text-muted font-body text-base max-w-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}
