export interface Experience {
  _id: string;

  company: string;

  position: string;

  description: string;

  companyLogo?: string;

  location?: string;


  startDate: string;

  endDate?: string;

  currentlyWorking: boolean;


  responsibilities: string[];


  technologies: string[];


  companyUrl?: string;


  order: number;


  createdAt?: string;

  updatedAt?: string;
}