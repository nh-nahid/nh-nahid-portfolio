
export interface Project {
  _id: string;
  name: string;
  tag: string;
  desc: string;
  url: string;
  github?: string;
  image?: string;
  featured: boolean;
  order: number;
  stack: string[];
  points: string[];
}