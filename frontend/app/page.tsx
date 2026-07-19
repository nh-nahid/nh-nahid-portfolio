import CustomCursor from "../components/CustomCursor";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NetworkMesh from "../components/NetworkMesh";
import Summary from "../components/Summary";
import EducationCerts from "../components/EducationCerts";

import Hero from "@/features/profile/components/Hero";
import Stats from "@/features/home/components/Stats";
import Stack from "../features/skills/components/Stack";
import Experience from "@/features/experience/components/Experience";
import Projects from "@/features/projects/components/Projects";
import Contact from "@/features/contact/components/Contact";

export default function Portfolio() {
  return (
    <div className="relative min-h-screen font-body text-white">
      <CustomCursor />

      {/* background layer */}
      <div className="fixed inset-0 z-0 bg-zinc-950">
        <NetworkMesh />
      </div>

      {/* content layer */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Summary />
          <Stack />
          <Experience />
          <Projects />
          <EducationCerts />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
