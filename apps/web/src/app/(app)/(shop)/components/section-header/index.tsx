interface SectionHeaderProps {
  title: string
  subtitle: string
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="h-10 w-4 rounded-[4px] bg-red-500" />
        <span className="text-lg font-semibold text-red-500">{title}</span>
      </div>
      <h3 className="font-inter text-4xl font-semibold">{subtitle}</h3>
    </div>
  )
}
