export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
}

export interface Profile {
  _id: string;
  name: string;
  title: string;
  subtitle?: string;
  bio: string;
  about: string;
  location: string;
  
  avatar: string;
  resume: string;

  email?: string;
  phone?: string;

  socialLinks?: SocialLinks;

  createdAt?: string;
  updatedAt?: string;
}