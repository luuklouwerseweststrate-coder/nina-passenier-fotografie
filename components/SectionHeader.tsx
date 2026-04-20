type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  accent?: "oranje" | "groen" | "geel" | "petrol" | "beige";
};

const accentColor = {
  oranje: "text-nina-oranje",
  groen: "text-nina-groen",
  geel: "text-nina-geel",
  petrol: "text-nina-petrol",
  beige: "text-nina-beige"
};

export default function SectionHeader({ eyebrow, title, lead, accent = "oranje" }: Props) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className={`text-xs uppercase tracking-[0.3em] mb-4 ${accentColor[accent]}`}>
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
