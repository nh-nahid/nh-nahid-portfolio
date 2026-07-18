import {
  Code2, Server, Database, Cloud, GitBranch, Terminal, Boxes, Layers,
  Zap, Lock, Globe2, Braces,
} from "lucide-react";

/* ---------------------------------------------------------------
   DATA — pulled straight from the resume. Edit anything here and
   it updates everywhere it's used.
----------------------------------------------------------------*/

export const NAV = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Stack", id: "stack" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export const STATS = [
  { value: "2,000+", label: "Daily users served in production" },
  { value: "10,000+", label: "Structured records kept in sync" },
  { value: "0.9s", label: "LCP, down from 4.2s" },
  { value: "99%", label: "GTmetrix score after CDN rollout" },
];

export const ORBIT_TOOLS = [
  { icon: Code2, label: "React.js" },
  { icon: Layers, label: "Next.js" },
  { icon: Braces, label: "TypeScript" },
  { icon: Server, label: "Node.js" },
  { icon: Terminal, label: "Express.js" },
  { icon: Database, label: "MongoDB" },
  { icon: Cloud, label: "Supabase" },
  { icon: Boxes, label: "Redux" },
  { icon: Zap, label: "Tailwind" },
  { icon: Lock, label: "JWT" },
  { icon: Globe2, label: "GraphQL" },
  { icon: GitBranch, label: "Docker" },
];

export const TOOLBOX = [
  "React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "Node.js",
  "Express.js", "MongoDB", "Mongoose", "MySQL", "Supabase", "Redux Toolkit",
  "Context API", "TanStack Query", "React Hook Form", "Axios", "Tailwind CSS",
  "Framer Motion", "React Router DOM", "Firebase", "JWT", "GraphQL",
  "Socket.io", "Prisma ORM", "Vitest", "REST APIs", "SSR / SSG / ISR",
  "Docker", "Git", "GitHub", "Postman",
];

export const EXPERIENCE = [
  {
    role: "Frontend Engineer",
    company: "Elite Wheel Distributors, Inc.",
    period: "Mar 2026 — Present",
    location: "Tampa, FL, United States · Remote",
    points: [
      "Built the frontend architecture in React, Next.js and TypeScript for a platform serving 2,000+ daily active users, tuned for responsive rendering across devices.",
      "Designed a shared component system and analytics dashboards for a multi-tenant SaaS supporting 300+ reseller accounts.",
      "Wired role-based auth and state with JWT, Redux Toolkit, React Query and Context API, cutting redundant data requests by ~25%.",
      "Took Largest Contentful Paint from 4.2s to 0.9s through code-splitting, lazy loading and asset optimization.",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "DevelopersTroop — Web, App, SEO & Software Company",
    period: "Sep 2025 — Mar 2026",
    location: "Dhaka, Bangladesh · Remote",
    points: [
      "Shipped responsive UI modules for enterprise and client-facing apps used by 2,000+ daily active users.",
      "Rebuilt a Year/Make/Model filtering integration, raising product-match accuracy from 70% to 95%.",
      "Rolled out Bunny CDN across e-commerce storefronts, pushing GTmetrix scores from 55% to 99%.",
      "Shipped 5+ production-ready frontend applications end to end, from build to client deployment.",
    ],
  },
];

export const PROJECTS = [
  {
    name: "Tirematic",
    tag: "Multi-Vendor Tire Marketplace",
    url: "https://stage.tirematic.com",
    desc: "A storefront-to-vendor tire marketplace with admin, vendor and affiliate modules covering the full order lifecycle.",
    points: [
      "Serves 2,000+ daily users across product discovery, order tracking and account management.",
      "Held checkout reliability above 99% while trimming friction from the purchase flow.",
      "Synced NetSuite ERP, AWS S3 and Google Drive for 95%+ data accuracy across inventory and media.",
    ],
    stack: ["React.js", "Next.js", "Node.js", "MongoDB", "AWS S3"],
  },
  {
    name: "WheelTireUSA",
    tag: "Automotive E-Commerce Platform",
    url: "https://www.wheeltireusa.com",
    desc: "A large-scale storefront for aftermarket wheels and tires built around fitment-aware search and catalog sync.",
    points: [
      "Let shoppers browse 15,000+ SKUs with advanced filtering, fitment and search.",
      "Synced 20,000+ catalog updates a month between internal systems and third-party platforms.",
      "Sped up pages with SSR and lazy loading, lifting organic traffic visibility.",
    ],
    stack: ["Next.js", "React.js", "TypeScript", "Node.js"],
  },
];

export const EDUCATION = {
  degree: "B.Sc. (Engineering) in Information & Communication Technology",
  school: "Islamic University, Bangladesh",
  period: "Jul 2024 — Present",
  location: "Kushtia, Bangladesh",
};

export const CERTS = [
  { name: "Reactive Accelerator", issuer: "Learn with Sumit" },
  { name: "MERN Stack Career Path", issuer: "Interactive Cares" },
  { name: "LWS Course Completion", issuer: "Learn with Sumit" },
  { name: "Recommendation Letter", issuer: "Learn with Sumit" },
];