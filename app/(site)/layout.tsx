import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
