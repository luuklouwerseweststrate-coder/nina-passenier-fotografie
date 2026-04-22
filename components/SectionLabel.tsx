type Props = {
  nr: string;
  label: string;
  className?: string;
};

export default function SectionLabel({ nr, label, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-3 mb-10 lg:mb-14 ${className}`}>
      <span className="text-[10px] text-faint tabular-nums">{nr}</span>
      <span className="h-px w-6 bg-border" />
      <span className="text-[9px] uppercase tracking-[0.28em] text-muted">{label}</span>
    </div>
  );
}
