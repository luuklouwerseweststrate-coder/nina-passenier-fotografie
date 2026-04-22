import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { settingsQuery } from "@/sanity/lib/queries";

export default async function Footer() {
  const settings = await client.fetch(settingsQuery).catch(() => null);

  const email     = settings?.email     || "hallo@ninapassenier.nl";
  const instagram = settings?.instagram || "ninapassenierfotografie";
  const location  = settings?.location  || "Rotterdam";

  return (
    <footer className="border-t border-border px-5 lg:px-8 py-5 lg:py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

        <Link
          href="/"
          className="text-[9px] uppercase tracking-[0.28em] text-muted hover:text-ink transition-colors"
        >
          Nina Passenier
        </Link>

        <div className="flex items-center gap-5 text-[9px] uppercase tracking-[0.22em] text-muted">
          <span>{location}</span>
          <a
            href={`mailto:${email}`}
            className="hover:text-ink transition-colors"
          >
            {email}
          </a>
          <a
            href={`https://instagram.com/${instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink transition-colors"
          >
            Instagram
          </a>
        </div>

      </div>
    </footer>
  );
}
