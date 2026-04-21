import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { settingsQuery } from "@/sanity/lib/queries";

export default async function Footer() {
  const settings = await client.fetch(settingsQuery).catch(() => null);

  const email = settings?.email || "hallo@ninapassenier.nl";
  const instagram = settings?.instagram || "ninapassenierfotografie";
  const location = settings?.location || "Rotterdam";

  return (
    <footer className="border-t border-black/8 px-5 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[11px] uppercase tracking-[0.25em] text-black/35">
        <Link href="/" className="hover:text-black transition-colors">
          Nina Passenier Fotografie
        </Link>
        <div className="flex items-center gap-6">
          <span>{location}</span>
          <a href={`mailto:${email}`} className="hover:text-black transition-colors">{email}</a>
          <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
