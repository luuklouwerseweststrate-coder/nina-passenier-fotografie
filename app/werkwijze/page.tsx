import Button from "@/components/Button";
import SectionHeader from "@/components/SectionHeader";

export const metadata = { title: "Werkwijze &mdash; Nina Passenier" };

const stappen = [
  {
    nr: "01",
    titel: "Kennismaking",
    tekst: "We drinken koffie, je vertelt wat je wilt maken en voor wie. Geen shot list, nog geen datum. Ik luister vooral."
  },
  {
    nr: "02",
    titel: "Voorstel & moodboard",
    tekst: "Op basis van het gesprek maak ik een voorstel met richting, locatie-ideeen, planning en prijs. Meestal korter dan je verwacht."
  },
  {
    nr: "03",
    titel: "Voorbereiding",
    tekst: "Locatie scouten, styling afstemmen, planning rond. Ik regel wat ik kan, jij houdt tijd over voor wat jij moet doen."
  },
  {
    nr: "04",
    titel: "De shoot zelf",
    tekst: "Op de dag zelf werk ik het liefst rustig en geduldig. Ik laat ruimte voor toeval. De beste frames zijn bijna nooit gepland."
  },
  {
    nr: "05",
    titel: "Selectie & bewerking",
    tekst: "Binnen een week ontvang je een eerste selectie. Na jouw feedback bewerk ik de definitieve beelden, in jouw merkstijl."
  },
  {
    nr: "06",
    titel: "Oplevering",
    tekst: "Digitale oplevering in alle benodigde formaten. Web, social, print, waar je het maar voor nodig hebt."
  }
];

export default function WerkwijzePage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-24 lg:py-32">
        <SectionHeader
          eyebrow="Werkwijze"
          title="Rustig, voorbereid, en met ruimte voor wat gebeurt."
          lead="Een shoot met mij is geen assemblagelijn. Maar ook geen chaos. Dit is hoe een project meestal loopt."
          accent="petrol"
        />
      </section>

      <section className="mx-auto max-w-5xl px-5 lg:px-10 pb-24 lg:pb-32">
        <div className="space-y-0">
          {stappen.map((s, i) => (
            <div
              key={s.nr}
              className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10 lg:py-14 border-t border-nina-ink/10 ${
                i === stappen.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="md:col-span-2">
                <p className="font-serif text-5xl md:text-6xl text-nina-oranje">{s.nr}</p>
              </div>
              <div className="md:col-span-10">
                <h3 className="font-serif text-2xl md:text-3xl tracking-display">{s.titel}</h3>
                <p className="mt-3 text-nina-ink/70 text-lg leading-relaxed max-w-2xl">{s.tekst}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-nina-ink text-nina-cream py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-5 lg:px-10 text-center">
          <h2 className="font-serif text-4xl md:text-6xl tracking-display leading-tight">
            Klaar om te starten?
          </h2>
          <p className="mt-6 text-lg opacity-80 max-w-xl mx-auto">
            Geen inschatting nodig vooraf. Eerst een gesprek, dan pas cijfers.
          </p>
          <div className="mt-10">
            <Button href="/contact" variant="oranje">Plan een kennismaking</Button>
          </div>
        </div>
      </section>
    </>
  );
}
