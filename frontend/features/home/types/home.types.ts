import type { Profile } from "@/features/profile/types/profile.types";

export interface Stat {
  value: string;
  label: string;
}

export interface Skill {
  _id: string;
  sectionTitle: string;
  heading: string;
  description: string;
  orbitTools: string[];
  toolbox: string[];
}

export interface Experience {
  _id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
}

export interface Project {
  _id: string;
  name: string;
  tag: string;
  desc: string;
  stack: string[];
  points: string[];
  url: string;
}

export interface HomeData {
  profile: Profile;
  stats: Stat[];
  skills: Skill[];
  experiences: Experience[];
  featuredProjects: Project[];
}