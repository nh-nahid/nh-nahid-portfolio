import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Reveal from "./Reveal";
import { EDUCATION, CERTS } from "../data/portfolioData";

/* ---------------------------------------------------------------
   EDUCATION + CERTIFICATIONS
   Requires shadcn components: card
----------------------------------------------------------------*/
export default function EducationCerts() {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 sm:px-8 md:grid-cols-2">
        <Reveal>
          <p className="font-mono-custom mb-4 text-xs uppercase tracking-widest text-lime-400">Education</p>
          <h2 className="font-display mb-6 text-2xl font-bold text-white">Academic background</h2>
          <Card className="border-zinc-800 bg-zinc-950 bg-opacity-60 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="font-display text-lg font-semibold text-white">{EDUCATION.degree}</h3>
              <p className="mt-1 text-lime-400">{EDUCATION.school}</p>
              <p className="mt-3 font-mono-custom text-xs text-zinc-500">
                {EDUCATION.period} · {EDUCATION.location}
              </p>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={150}>
          <p className="font-mono-custom mb-4 text-xs uppercase tracking-widest text-lime-400">Certifications</p>
          <h2 className="font-display mb-6 text-2xl font-bold text-white">Verified credentials</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CERTS.map((c) => (
              <Card
                key={c.name}
                className="border-zinc-800 bg-zinc-950 bg-opacity-60 backdrop-blur-sm transition-colors hover:border-lime-400 hover:border-opacity-40"
              >
                <CardContent className="flex items-start gap-3 p-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-lime-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">{c.name}</p>
                    <p className="text-xs text-zinc-500">{c.issuer}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
