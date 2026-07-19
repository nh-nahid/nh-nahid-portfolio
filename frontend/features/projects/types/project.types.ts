export interface Project {
  _id: string;

  title: string;

  slug: string;

  description: string;


  image: string;


  category: string;


  technologies: string[];


  githubUrl?: string;

  liveUrl?: string;

  figmaUrl?: string;


  featured: boolean;


  order: number;


  createdAt?: string;

  updatedAt?: string;
}