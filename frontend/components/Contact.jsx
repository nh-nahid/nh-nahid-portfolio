"use client"

import React, { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Reveal from "./Reveal";
import { FaLinkedin } from "react-icons/fa";

/* ---------------------------------------------------------------
   CONTACT
   Requires shadcn components: card, input, textarea, label, button
----------------------------------------------------------------*/
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    // TODO: wire this up to Formspree / EmailJS / your own API endpoint
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
      <Reveal className="mb-14 text-center">
        <p className="font-mono-custom mb-4 text-xs uppercase tracking-widest text-lime-400">Get In Touch</p>
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Let's build something reliable</h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400">
          Open to full-time roles and freelance frontend / full-stack work. If it
          involves React, Next.js and shipping something people actually use,
          I&apos;m interested.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
        <Reveal className="space-y-4 md:col-span-2">
          <a href="mailto:nahid4510@gmail.com">
            <Card className="border-zinc-800 bg-zinc-900 bg-opacity-40 backdrop-blur-sm transition-colors hover:border-lime-400 hover:border-opacity-40">
              <CardContent className="flex items-center gap-3 p-4">
                <span className="rounded-full bg-lime-400 bg-opacity-10 p-2 text-lime-400">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-zinc-500">Email</p>
                  <p className="text-sm text-zinc-200">nahid4510@gmail.com</p>
                </div>
              </CardContent>
            </Card>
          </a>

          <a href="tel:+8801617121519">
            <Card className="border-zinc-800 bg-zinc-900 bg-opacity-40 backdrop-blur-sm transition-colors hover:border-lime-400 hover:border-opacity-40">
              <CardContent className="flex items-center gap-3 p-4">
                <span className="rounded-full bg-lime-400 bg-opacity-10 p-2 text-lime-400">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-zinc-500">Phone</p>
                  <p className="text-sm text-zinc-200">+880 1617121519</p>
                </div>
              </CardContent>
            </Card>
          </a>

          <Card className="border-zinc-800 bg-zinc-900 bg-opacity-40 backdrop-blur-sm">
            <CardContent className="flex items-center gap-3 p-4">
              <span className="rounded-full bg-lime-400 bg-opacity-10 p-2 text-lime-400">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs text-zinc-500">Location</p>
                <p className="text-sm text-zinc-200">Dhaka, Bangladesh</p>
              </div>
            </CardContent>
          </Card>

          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <Card className="border-zinc-800 bg-zinc-900 bg-opacity-40 backdrop-blur-sm transition-colors hover:border-lime-400 hover:border-opacity-40">
              <CardContent className="flex items-center gap-3 p-4">
                <span className="rounded-full bg-lime-400 bg-opacity-10 p-2 text-lime-400">
                  <FaLinkedin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-zinc-500">LinkedIn</p>
                  <p className="text-sm text-zinc-200">Connect with me</p>
                </div>
              </CardContent>
            </Card>
          </a>
        </Reveal>

        <Reveal delay={150} className="md:col-span-3">
          <Card className="border-zinc-800 bg-zinc-950 bg-opacity-60 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <Label htmlFor="name" className="mb-1.5 block text-xs text-zinc-500">Full Name</Label>
                    <Input
                      required
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <Label htmlFor="email" className="mb-1.5 block text-xs text-zinc-500">Email</Label>
                    <Input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="message" className="mb-1.5 block text-xs text-zinc-500">Message</Label>
                    <Textarea
                      required
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      className="resize-none border-zinc-800 bg-zinc-900 text-white focus-visible:ring-lime-400"
                      placeholder="Tell me about the project or role..."
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="mt-5 rounded-full bg-lime-400 text-zinc-950 hover:bg-lime-300"
                >
                  <Send className="mr-1 h-4 w-4" /> Send Message
                </Button>

                {sent && (
                  <p className="mt-4 flex items-center gap-2 text-sm text-lime-400">
                    <CheckCircle2 className="h-4 w-4" /> Thanks — this demo form doesn't send yet, but reach me directly at nahid4510@gmail.com.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
