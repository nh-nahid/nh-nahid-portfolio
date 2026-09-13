import { Clock, ArrowUpRight } from "lucide-react";
import { FaLinkedin, FaGithub, FaFacebook, FaWhatsapp } from "react-icons/fa";

import Reveal from "@/components/Reveal";
import { getProfile } from "@/features/profile/api/profile.api";
import ContactForm from "./ContactForm";
import ContactLinkCard from "./ContactLinkCard";

export default async function Contact() {
  let profile = null;
  try {
    profile = await getProfile();
  } catch {
    // API offline during build, fallback gracefully
  }

  if (!profile) return null;

  const contactLinks = [
    {
      type: "email" as const,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      description: "Best way to reach me",
    },
    {
      type: "phone" as const,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone}`,
      description: "Always available",
    },
    {
      type: "location" as const,
      label: "Location",
      value: profile.location,
      href: null,
      description: "Available for remote work",
    },
  ];

  const fbUrl = profile.socialLinks?.facebook
    ? (profile.socialLinks.facebook.startsWith("http")
        ? profile.socialLinks.facebook
        : `https://facebook.com/${profile.socialLinks.facebook}`)
    : "https://facebook.com/nh.nahid.h";

  const socials = [
    profile.socialLinks?.linkedin && {
      icon: FaLinkedin,
      label: "LinkedIn",
      href: profile.socialLinks.linkedin.startsWith("http")
        ? profile.socialLinks.linkedin
        : `https://linkedin.com/in/${profile.socialLinks.linkedin}`,
      username: "nahid-nh",
      color: "hover:text-lime-400 hover:border-lime-400/40",
    },
    profile.socialLinks?.github && {
      icon: FaGithub,
      label: "GitHub",
      href: profile.socialLinks.github.startsWith("http")
        ? profile.socialLinks.github
        : `https://github.com/${profile.socialLinks.github}`,
      username: "nh-nahid",
      color: "hover:text-lime-400 hover:border-lime-400/40",
    },
    {
      icon: FaFacebook,
      label: "Facebook",
      href: fbUrl,
      username: "nh.nahid.h",
      color: "hover:text-lime-400 hover:border-lime-400/40",
    },
    
  ].filter(Boolean) as {
    icon: React.ElementType;
    label: string;
    href: string;
    username: string;
    color: string;
  }[];



  return (
    <section id="contact" className="relative overflow-hidden py-14 sm:py-20 md:py-24">
      {/* Background glow blobs */}
      <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-lime-400/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-lime-400/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">

        {/* ── Section header */}
        <Reveal className="mb-16 text-center">
          <p className="font-mono-custom mb-4 text-xs uppercase tracking-widest text-lime-400">
            Get In Touch
          </p>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Let&apos;s build something reliable
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400">
            Open to full-time roles and freelance frontend / full-stack work.
            If it involves React, Next.js and shipping something people actually use, I&apos;m interested.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">

          {/* ── LEFT: info panel */}
          <Reveal className="flex flex-col gap-6 lg:col-span-2">

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2.5 self-start rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
              </span>
              <span className="text-xs font-medium text-lime-300">
                Ready to Build & Scale
              </span>
            </div>

            {/* Response time */}
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Clock className="h-3.5 w-3.5 text-zinc-600" />
              Typical response time: within 24 hours
            </div>

            <div className="flex flex-col gap-3">
              {contactLinks.map((item) => (
                <ContactLinkCard
                  key={item.label}
                  type={item.type}
                  label={item.label}
                  value={item.value ?? ""}
                  href={item.href}
                  description={item.description}
                />
              ))}
            </div>


            {/* Social links */}
            {socials.length > 0 && (
              <div className="mt-2">
                <p className="mb-3 text-[10px] uppercase tracking-widest text-zinc-600">
                  Also find me on
                </p>
                <div className="flex flex-col gap-2">
                  {socials.map(({ icon: Icon, label, href, username, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/30 px-4 py-3 text-zinc-400 transition-all duration-200 ${color}`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-medium">{label}</span>
                        <span className="ml-2 text-[10px] text-zinc-600">
                          @{username}
                        </span>
                      </div>
                      <ArrowUpRight className="h-3 w-3 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </Reveal>

          {/* ── RIGHT: Contact Form */}
          <Reveal delay={150} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
