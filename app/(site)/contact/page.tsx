import { client } from "@/sanity/lib/client";
import { settingsQuery } from "@/sanity/lib/queries";
import ContactForm from "./ContactForm";

export const revalidate = 3600;

export default async function ContactPage() {
  const settings = await client.fetch(settingsQuery).catch(() => null);

  const email     = settings?.email     || "ninapassenierfotografie@gmail.com";
  const instagram = settings?.instagram || "ninapassenier.fotografie";

  return <ContactForm email={email} instagram={instagram} />;
}
