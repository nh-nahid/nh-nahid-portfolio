"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // If already logged in, redirect straight to admin panel
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/admin");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    try {
      await login(email, password);
      toast.success("Login successful!");
      router.push("/admin");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-5 bg-zinc-950 text-white">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900/40 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="font-display text-2xl font-bold tracking-tight text-white">
            <span className="text-lime-400">&lt;/&gt;</span> admin panel
          </CardTitle>
          <p className="text-xs text-zinc-500">
            Sign in to manage your portfolio site content.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-zinc-400 text-xs">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-zinc-800 bg-zinc-900/60 text-white focus-visible:ring-lime-400"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-zinc-400 text-xs">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-zinc-800 bg-zinc-900/60 text-white focus-visible:ring-lime-400"
              />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full mt-4 rounded-full bg-lime-400 text-zinc-950 font-medium hover:bg-lime-300 disabled:opacity-60"
            >
              {submitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
