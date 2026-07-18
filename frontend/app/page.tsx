import React from "react";
import GlobalStyles from "../components/GlobalStyles";
import BackgroundGradient from "../components/BackgroundGradient";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Summary from "../components/Summary";
import Stack from "../components/Stack";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import EducationCerts from "../components/EducationCerts";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

/* ---------------------------------------------------------------
   ROOT — composes every section. Each piece lives in its own file
   under ./components, so you can reorder, remove or reuse any of
   them independently.
----------------------------------------------------------------*/
export default function Portfolio() {
  return (
    <div className="relative min-h-screen bg-zinc-950 font-body text-white">
      <GlobalStyles />
      <BackgroundGradient />

      <Navbar />
      <main className="relative z-10">
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
  );
}
