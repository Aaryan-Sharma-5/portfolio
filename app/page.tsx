import dynamic from "next/dynamic";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

// Below-fold sections — split into separate JS chunks, loaded after critical paint
const Projects       = dynamic(() => import("@/components/Projects").then((m) => ({ default: m.Projects })));
const Experience     = dynamic(() => import("@/components/Experience").then((m) => ({ default: m.Experience })));
const Extracurriculars = dynamic(() => import("@/components/Extracurriculars").then((m) => ({ default: m.Extracurriculars })));
const Skills         = dynamic(() => import("@/components/Skills").then((m) => ({ default: m.Skills })));
const Achievements   = dynamic(() => import("@/components/Achievements").then((m) => ({ default: m.Achievements })));
const Contact        = dynamic(() => import("@/components/Contact").then((m) => ({ default: m.Contact })));
const Footer         = dynamic(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));

export default function Home() {
  return (
    <main className="min-h-screen relative text-foreground">
      <AmbientBackground />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Extracurriculars />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Achievements />
        <SectionDivider />
        <Contact />
        <Footer />
      </div>
      <ThemeSwitcher />
    </main>
  );
}
