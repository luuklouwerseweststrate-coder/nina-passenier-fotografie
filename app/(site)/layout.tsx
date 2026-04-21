import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="pt-20 lg:pt-24">{children}</main>
      <Footer />
    </>
  );
}
