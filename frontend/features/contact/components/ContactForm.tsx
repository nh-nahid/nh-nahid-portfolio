"use client";

import { useState, ChangeEvent } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";
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

/* ---------------------------------------------------------------
   CONTACT FORM
   Every Input/Textarea/Label below gets explicit border, bg, and
   text-color classes instead of relying on shadcn's --input /
   --foreground theme tokens, so it can't render differently
   depending on your globals.css theme setup.
----------------------------------------------------------------*/
export default function ContactForm() {
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      await sendMessage(form);
      toast.success("Message sent successfully.");
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

  return (
    <Card className="border border-zinc-800 bg-zinc-950/60 text-white backdrop-blur-sm">
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name" className="mb-1.5 block text-xs text-zinc-500">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className="border border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus-visible:border-lime-400 focus-visible:ring-lime-400"
              />
            </div>

            <div>
              <Label htmlFor="email" className="mb-1.5 block text-xs text-zinc-500">
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
                className="border border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus-visible:border-lime-400 focus-visible:ring-lime-400"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="subject" className="mb-1.5 block text-xs text-zinc-500">
                Subject
              </Label>
              <Input
                id="subject"
                name="subject"
                required
                placeholder="Project inquiry"
                value={form.subject}
                onChange={handleChange}
                className="border border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus-visible:border-lime-400 focus-visible:ring-lime-400"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="message" className="mb-1.5 block text-xs text-zinc-500">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={handleChange}
                className="resize-none border border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus-visible:border-lime-400 focus-visible:ring-lime-400"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-5 rounded-full bg-lime-400 text-zinc-950 hover:bg-lime-300 disabled:opacity-60"
          >
            <Send className="mr-2 h-4 w-4" />
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
