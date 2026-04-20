type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
};

export default function SectionHeader({ eyebrow, title, lead }: Props) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.3em] mb-4 text-nina-ink/50">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-display text-nina-ink">
        {title}
      </h2>
      {lead && <p className="mt-6 text-lg text-nina-ink/70 leading-relaxed">{lead}</p>}
    </div>
  );
}
