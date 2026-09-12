"use client";

import { useState, ChangeEvent } from "react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { sendMessage } from "../api/contact.api";

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await sendMessage(form);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Failed to send message.");
      } else {
        toast.error("Failed to send message.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "border border-zinc-800 bg-zinc-900/80 text-white placeholder:text-zinc-600 " +
    "focus-visible:border-lime-400/60 focus-visible:ring-1 focus-visible:ring-lime-400/30 " +
    "transition-colors duration-200 rounded-lg";

  const labelCls = "mb-1.5 block text-[11px] uppercase tracking-widest text-zinc-500";

  return (
    /* Gradient border wrapper */
    <div className="relative rounded-2xl p-px">
      {/* Subtle gradient border */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-lime-400/20 via-zinc-800/20 to-zinc-700/10" />

      <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur-sm sm:p-8">

        {/* Form header */}
        <div className="mb-6">
          <h3 className="font-display text-lg font-semibold text-white">
            Send a message
          </h3>
          <p className="mt-1 text-xs text-zinc-500">
            Fill out the form below and I&apos;ll respond as soon as possible.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name + Email row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name" className={labelCls}>
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className={inputCls}
              />
            </div>

            <div>
              <Label htmlFor="email" className={labelCls}>
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={inputCls}
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <Label htmlFor="subject" className={labelCls}>
              Subject
            </Label>
            <Input
              id="subject"
              name="subject"
              required
              placeholder="What's this about?"
              value={form.subject}
              onChange={handleChange}
              className={inputCls}
            />
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message" className={labelCls}>
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Tell me about your project, idea, or opportunity..."
              value={form.message}
              onChange={handleChange}
              className={`resize-none ${inputCls}`}
            />
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={loading}
            className="group mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-lime-400 py-3 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:bg-lime-300 hover:shadow-[0_0_20px_rgba(163,230,53,0.25)] disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
