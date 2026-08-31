import React from "react";
import type { IconType } from "react-icons";
import {
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiMysql,
  SiPostgresql,
  SiSupabase,
  SiFirebase,
  SiRedux,
  SiReactquery,
  SiReacthookform,
  SiReactrouter,
  SiAxios,
  SiTailwindcss,
  SiFramer,
  SiJsonwebtokens,
  SiGraphql,
  SiSocketdotio,
  SiPrisma,
  SiVitest,
  SiTestinglibrary,
  SiJest,
  SiDocker,
  SiGit,
  SiGithub,
  SiPostman,
  SiVite,
  SiWebpack,
  SiBun,
  SiRedis,
  SiPython,
  SiCplusplus,
  SiWordpress,
  SiFigma,
  SiVercel,
  SiLinux,
  SiNginx,
  SiSass,
  SiBootstrap,
  SiStripe,
} from "react-icons/si";
import { FaCss3Alt, FaAws } from "react-icons/fa6";
import { TbApi } from "react-icons/tb";
import { Code2 } from "lucide-react";

interface TechMeta {
  icon: IconType;
  color?: string;
}

const TECH_MAP: Record<string, TechMeta> = {
  // Frontend
  html: { icon: SiHtml5, color: "#E34F26" },
  html5: { icon: SiHtml5, color: "#E34F26" },
  css: { icon: FaCss3Alt, color: "#1572B6" },
  css3: { icon: FaCss3Alt, color: "#1572B6" },
  javascript: { icon: SiJavascript, color: "#F7DF1E" },
  "javascript (es6+)": { icon: SiJavascript, color: "#F7DF1E" },
  js: { icon: SiJavascript, color: "#F7DF1E" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  ts: { icon: SiTypescript, color: "#3178C6" },
  react: { icon: SiReact, color: "#61DAFB" },
  "react.js": { icon: SiReact, color: "#61DAFB" },
  "react js": { icon: SiReact, color: "#61DAFB" },
  next: { icon: SiNextdotjs, color: "#FFFFFF" },
  "next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
  "next js": { icon: SiNextdotjs, color: "#FFFFFF" },
  redux: { icon: SiRedux, color: "#764ABC" },
  "redux toolkit": { icon: SiRedux, color: "#764ABC" },
  "context api": { icon: SiReact, color: "#61DAFB" },
  "tanstack query": { icon: SiReactquery, color: "#FF4154" },
  "react query": { icon: SiReactquery, color: "#FF4154" },
  "react hook form": { icon: SiReacthookform, color: "#EC5990" },
  "react router": { icon: SiReactrouter, color: "#CA4245" },
  "react router dom": { icon: SiReactrouter, color: "#CA4245" },
  axios: { icon: SiAxios, color: "#5A29E4" },
  tailwind: { icon: SiTailwindcss, color: "#06B6D4" },
  "tailwind css": { icon: SiTailwindcss, color: "#06B6D4" },
  tailwindcss: { icon: SiTailwindcss, color: "#06B6D4" },
  "framer motion": { icon: SiFramer, color: "#0055FF" },
  framer: { icon: SiFramer, color: "#0055FF" },
  sass: { icon: SiSass, color: "#CC6699" },
  scss: { icon: SiSass, color: "#CC6699" },
  bootstrap: { icon: SiBootstrap, color: "#7952B3" },

  // Backend
  node: { icon: SiNodedotjs, color: "#5FA04E" },
  "node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  "node js": { icon: SiNodedotjs, color: "#5FA04E" },
  express: { icon: SiExpress, color: "#FFFFFF" },
  "express.js": { icon: SiExpress, color: "#FFFFFF" },
  "express js": { icon: SiExpress, color: "#FFFFFF" },
  jwt: { icon: SiJsonwebtokens, color: "#D63AFF" },
  jsonwebtokens: { icon: SiJsonwebtokens, color: "#D63AFF" },
  graphql: { icon: SiGraphql, color: "#E10098" },
  "socket.io": { icon: SiSocketdotio, color: "#010101" },
  socketio: { icon: SiSocketdotio, color: "#FFFFFF" },
  "rest apis": { icon: TbApi, color: "#A3E635" },
  "rest api": { icon: TbApi, color: "#A3E635" },
  rest: { icon: TbApi, color: "#A3E635" },
  "ssr / ssg / isr": { icon: SiNextdotjs, color: "#FFFFFF" },
  ssr: { icon: SiNextdotjs, color: "#FFFFFF" },

  // Database
  mongodb: { icon: SiMongodb, color: "#47A248" },
  mongoose: { icon: SiMongoose, color: "#880000" },
  mysql: { icon: SiMysql, color: "#4479A1" },
  postgresql: { icon: SiPostgresql, color: "#4169E1" },
  postgres: { icon: SiPostgresql, color: "#4169E1" },
  prisma: { icon: SiPrisma, color: "#2D3748" },
  "prisma orm": { icon: SiPrisma, color: "#5A67D8" },
  supabase: { icon: SiSupabase, color: "#3ECF8E" },
  firebase: { icon: SiFirebase, color: "#FFCA28" },
  redis: { icon: SiRedis, color: "#DC382D" },

  // Testing & Tools
  vitest: { icon: SiVitest, color: "#729B1B" },
  playwright: { icon: SiTestinglibrary, color: "#2EAD33" },
  jest: { icon: SiJest, color: "#C21325" },
  docker: { icon: SiDocker, color: "#2496ED" },
  git: { icon: SiGit, color: "#F05032" },
  github: { icon: SiGithub, color: "#FFFFFF" },
  postman: { icon: SiPostman, color: "#FF6C37" },
  vite: { icon: SiVite, color: "#646CFF" },
  webpack: { icon: SiWebpack, color: "#8DD6F9" },
  bun: { icon: SiBun, color: "#FBF0DF" },
  vercel: { icon: SiVercel, color: "#FFFFFF" },
  aws: { icon: FaAws, color: "#FF9900" },
  "aws s3": { icon: FaAws, color: "#569A31" },
  "amazon s3": { icon: FaAws, color: "#569A31" },
  linux: { icon: SiLinux, color: "#FCC624" },
  nginx: { icon: SiNginx, color: "#009639" },
  stripe: { icon: SiStripe, color: "#008CDD" },
  figma: { icon: SiFigma, color: "#F24E1E" },
  python: { icon: SiPython, color: "#3776AB" },
  "c++": { icon: SiCplusplus, color: "#00599C" },
  wordpress: { icon: SiWordpress, color: "#21759B" },
};

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
  useBrandColor?: boolean;
}

export default function TechIcon({
  name,
  className = "h-4 w-4",
  size,
  useBrandColor = true,
}: TechIconProps) {
  const normalized = name.trim().toLowerCase();
  const meta = TECH_MAP[normalized];

  if (!meta) {
    return <Code2 className={className} size={size} />;
  }

  const IconComponent = meta.icon;
  return (
    <IconComponent
      className={className}
      size={size}
      style={useBrandColor && meta.color ? { color: meta.color } : undefined}
    />
  );
}
