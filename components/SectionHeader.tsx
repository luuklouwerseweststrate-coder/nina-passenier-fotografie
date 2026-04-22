type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  accent?: "commerce" | "free" | "muted";
};

const accentColor: Record<string, string> = {
  commerce: "text-commerce",
  free:     "text-free",
  muted:    "text-muted",
};

export default function SectionHeader({ eyebrow, title, lead, accent = "muted" }: Props) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className={`text-[9px] uppercase tracking-[0.28em] mb-5 ${accentColor[accent] ?? "text-muted"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-ink">
        {title}
      </h2>
      {lead && <p className="mt-5 text-base text-ink/60 leading-relaxed">{lead}</p>}
    </div>
  );
}
