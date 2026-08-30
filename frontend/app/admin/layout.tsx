"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!loading && !isAuthenticated && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [loading, isAuthenticated, isLoginPage, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-zinc-950 text-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-lime-400 border-t-transparent" />
      </div>
    );
  }

  if (isLoginPage) {
    return <div className="min-h-screen bg-zinc-950">{children}</div>;
  }

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-950 text-white flex-col md:flex-row">
      {/* Mobile Sticky Header */}
      <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6 py-4 md:hidden flex-shrink-0">
        <span className="font-display text-base font-semibold text-white">
          <span className="text-lime-400">&lt;/&gt;</span> admin
        </span>
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger className="text-zinc-200" aria-label="Toggle menu">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 border-zinc-800 bg-zinc-950 text-white">
            <AdminSidebar onLogout={logout} className="border-r-0 h-full" />
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Sidebar (hidden on mobile) */}
      <AdminSidebar onLogout={logout} className="hidden md:flex h-full" />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-12">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
