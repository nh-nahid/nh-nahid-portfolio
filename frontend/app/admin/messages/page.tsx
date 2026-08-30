"use client";

import React, { useEffect, useState } from "react";
import api from "@/services/api/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, Mail, MailOpen, Calendar } from "lucide-react";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";

interface Message {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadMessages() {
    try {
      const res = await api.get("/contact");
      setMessages(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load contact messages.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function handleMarkRead(id: string) {
    try {
      await api.patch(`/contact/${id}/read`);
      toast.success("Message marked as read.");
      await loadMessages();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update message status.");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      await api.delete(`/contact/${id}`);
      toast.success("Message deleted successfully!");
      await loadMessages();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete message.");
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-lime-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Contact Messages"
        description="Inbox containing inquiries and messages sent via your contact form."
      />

      <div className="space-y-4">
        {messages.map((msg) => (
          <Card
            key={msg._id}
            className={`border-zinc-800 backdrop-blur-sm transition-all duration-300 ${
              msg.read ? "bg-zinc-905/30 opacity-75" : "bg-zinc-900/60 border-l-4 border-l-lime-400"
            }`}
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <h4 className="font-display font-semibold text-white flex items-center gap-2">
                    {msg.name}
                    {!msg.read && (
                      <span className="rounded-full bg-lime-400/15 border border-lime-400/30 px-2 py-0.5 text-[9px] font-bold text-lime-400 uppercase tracking-widest">
                        New
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-lime-400">{msg.email}</p>
                </div>

                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                  <Calendar className="h-3.5 w-3.5" />
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  }) : ""}
                </div>
              </div>

              {msg.subject && (
                <p className="text-xs font-semibold text-zinc-300 bg-zinc-950/60 px-3 py-1 rounded inline-block">
                  Subject: {msg.subject}
                </p>
              )}

              <p className="text-sm leading-relaxed text-zinc-300 bg-zinc-950/20 p-4 rounded-lg border border-zinc-800/40 font-mono-custom">
                {msg.message}
              </p>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-850">
                {!msg.read && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleMarkRead(msg._id)}
                    className="border-zinc-700 bg-transparent text-zinc-400 hover:text-lime-400 hover:border-lime-400/40 text-xs"
                    size="sm"
                  >
                    <MailOpen className="mr-2 h-3.5 w-3.5" /> Mark as Read
                  </Button>
                )}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleDelete(msg._id)}
                  className="border-zinc-700 bg-transparent text-zinc-450 hover:border-red-400/50 hover:text-red-400 text-xs"
                  size="sm"
                >
                  <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {messages.length === 0 && (
          <div className="rounded-lg border border-dashed border-zinc-800 p-12 text-center text-zinc-500">
            No contact messages in your inbox.
          </div>
        )}
      </div>
    </div>
  );
}
