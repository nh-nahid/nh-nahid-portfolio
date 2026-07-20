
export interface Project {
  _id: string;
  name: string;
  tag: string;
  desc: string;
  url: string;
  github?: string;
  coverImage?: string;
  featured: boolean;
  order: number;
  stack: string[];
  points: string[];
}