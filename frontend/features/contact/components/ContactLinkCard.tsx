"use client";

import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

type ContactType = "email" | "phone" | "whatsapp" | "location";

const ICONS: Record<ContactType, React.ElementType> = {
  email: Mail,
  phone: Phone,
  whatsapp: FaWhatsapp,
  location: MapPin,
};

interface ContactLinkCardProps {
  type: ContactType;
  label: string;
  value: string;
  href: string | null;
  description: string;
}

export default function ContactLinkCard({
  type,
  label,
  value,
  href,
  description,
}: ContactLinkCardProps) {
  const Icon = ICONS[type];

  const cardContent = (
    <>
      {/* Icon box */}
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-lime-400 transition-colors group-hover:border-lime-400/50 group-hover:bg-lime-400/10">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-widest text-zinc-500">
          {label}
        </p>
        <p className="truncate text-sm font-medium text-zinc-200 group-hover:text-white">
          {value}
        </p>
        <p className="text-[10px] text-zinc-600">{description}</p>
      </div>

      {href && (
        <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 text-zinc-600 transition-colors group-hover:text-lime-400" />
      )}
    </>
  );

  const cls =
    "group flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-lime-400/40 hover:bg-zinc-900/80";

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {cardContent}
      </a>
    );
  }

  return <div className={cls}>{cardContent}</div>;
}
