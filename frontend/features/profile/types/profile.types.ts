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
  bio: string;
  location: string;
  
  avatar: string;
  resume: string;

  email?: string;
  phone?: string;

  socialLinks?: SocialLinks;

  createdAt?: string;
  updatedAt?: string;
}