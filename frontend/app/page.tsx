import React from "react";
import NetworkMesh from "../components/NetworkMesh";
import CustomCursor from "../components/CustomCursor";
import Navbar from "../components/Navbar";
import Stats from "../components/Stats";
import Summary from "../components/Summary";
import Stack from "../components/Stack";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import EducationCerts from "../components/EducationCerts";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

import Hero from "@/features/profile/components/Hero";
/* ---------------------------------------------------------------
   ROOT — composes every section.

   Layering is explicit and avoids negative z-index entirely (which
   silently loses to an ancestor's own background unless that
   ancestor forms its own stacking context — the earlier -z-10/-5
   approach was getting hidden behind bg-zinc-950 on the root div):

     - one fixed, z-0 layer holds the gradient + animated mesh
     - one relative, z-10 layer holds the real content
----------------------------------------------------------------*/
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
            {/* <Summary />
          <Stack />
          <Experience />
          <Projects />
          <EducationCerts />
          <Contact /> */}
        </main>
        <Footer />
      </div>
    </div>
  );
}
