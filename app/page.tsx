import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import ModuleExplorer from "@/components/ModuleExplorer";
import Profiles from "@/components/Profiles";
import Comparison from "@/components/Comparison";
import Demo from "@/components/Demo";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <Hero />
      <Pillars />
      <ModuleExplorer />
      <Profiles />
      <Comparison />
      <Demo />
      <Footer />
    </div>
  );
}
