import { Mail, Phone, MapPin } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

import { Card, CardContent } from "@/components/ui/card";

import Reveal from "@/components/Reveal";

import { getProfile } from "@/features/profile/api/profile.api";
import ContactForm from "./ContactForm";

export default async function Contact() {
  const profile = await getProfile();

  return (
    <section id="contact" className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
      <Reveal className="mb-14 text-center">
        <p className="font-mono-custom mb-4 text-xs uppercase tracking-widest text-lime-400">
          Get In Touch
        </p>

        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Let&apos;s build something reliable
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400">
          Open to full-time roles and freelance frontend / full-stack work.
          If it involves React, Next.js and shipping something people
          actually use, I&apos;m interested.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
        <Reveal className="space-y-4 flex flex-col  md:col-span-2">
          <a href={`mailto:${profile.email}`}>
            <Card className="border border-zinc-800 bg-zinc-900/40 text-white backdrop-blur-sm transition-colors hover:border-lime-400/40">
              <CardContent className="flex items-center gap-3 p-4">
                <span className="rounded-full bg-lime-400/10 p-2 text-lime-400">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-zinc-500">Email</p>
                  <p className="text-sm text-zinc-200">{profile.email}</p>
                </div>
              </CardContent>
            </Card>
          </a>

          <a href={`tel:${profile.phone}`}>
            <Card className="border border-zinc-800 bg-zinc-900/40 text-white backdrop-blur-sm transition-colors hover:border-lime-400/40">
              <CardContent className="flex items-center gap-3 p-4">
                <span className="rounded-full bg-lime-400/10 p-2 text-lime-400">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-zinc-500">Phone</p>
                  <p className="text-sm text-zinc-200">{profile.phone}</p>
                </div>
              </CardContent>
            </Card>
          </a>

          <Card className="border border-zinc-800 bg-zinc-900/40 text-white backdrop-blur-sm">
            <CardContent className="flex items-center gap-3 p-4">
              <span className="rounded-full bg-lime-400/10 p-2 text-lime-400">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs text-zinc-500">Location</p>
                <p className="text-sm text-zinc-200">{profile.location}</p>
              </div>
            </CardContent>
          </Card>

          {profile.socialLinks?.linkedin && (
            <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <Card className="border border-zinc-800 bg-zinc-900/40 text-white backdrop-blur-sm transition-colors hover:border-lime-400/40">
                <CardContent className="flex items-center gap-3 p-4">
                  <span className="rounded-full bg-lime-400/10 p-2 text-lime-400">
                    <FaLinkedin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs text-zinc-500">LinkedIn</p>
                    <p className="text-sm text-zinc-200">Connect with me</p>
                  </div>
                </CardContent>
              </Card>
            </a>
          )}
        </Reveal>

        <Reveal delay={150} className="md:col-span-3">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
