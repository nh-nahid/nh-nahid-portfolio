export interface Experience {
  _id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];

  employmentType?: string;
  companyLogo?: string;
  technologies?: string[];
  currentlyWorking?: boolean;
  startDate?: string;
  endDate?: string | null;
  order?: number;
}