import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ModuleExplorer from "@/components/ModuleExplorer";
import PremiumSection from "@/components/PremiumSection";
import WhatsappAssistant from "@/components/WhatsappAssistant";
import Profiles from "@/components/Profiles";
import Demo from "@/components/Demo";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav overlayHero />
      <main id="contenido">
        <Hero />
        <ModuleExplorer />
        <PremiumSection />
        <WhatsappAssistant />
        <Profiles />
        <Demo />
      </main>
      <Footer />
    </div>
  );
}
