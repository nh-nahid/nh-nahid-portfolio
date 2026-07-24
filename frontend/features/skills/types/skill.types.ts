export interface SkillCategory {
  title: string;
  items: string[];
}

export interface Skill {
  _id: string;

  sectionTitle: string;
  heading: string;
  description: string;

  orbitTools: string[];
  toolbox: string[];

  categories: SkillCategory[];

  createdAt?: string;
  updatedAt?: string;
}