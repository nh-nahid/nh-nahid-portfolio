export interface Skill {
  _id: string;

  name: string;

  category:
    | "frontend"
    | "backend"
    | "database"
    | "tools"
    | "other";

  icon?: string;

  proficiency?:
    | "beginner"
    | "intermediate"
    | "advanced"
    | "expert";

  order: number;

  createdAt?: string;
  updatedAt?: string;
}