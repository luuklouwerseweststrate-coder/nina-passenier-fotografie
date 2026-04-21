type Props = {
  nr: string;
  label: string;
  className?: string;
};

export default function SectionLabel({ nr, label, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-3 mb-10 lg:mb-14 ${className}`}>
      <span className="text-xs text-nina-ink/35 font-sans tabular-nums">{nr}</span>
      <span className="h-px w-6 bg-nina-ink/20" />
      <span className="text-xs uppercase tracking-[0.25em] text-nina-ink/50">{label}</span>
    </div>
  );
}
