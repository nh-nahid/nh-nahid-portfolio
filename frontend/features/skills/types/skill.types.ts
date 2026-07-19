export interface Skill {
  _id: string;

  sectionTitle: string;
  heading: string;
  description: string;

  orbitTools: string[];
  toolbox: string[];

  createdAt?: string;
  updatedAt?: string;
}