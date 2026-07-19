import { Schema, model, Document } from "mongoose";

export interface IExperience extends Document {
  company: string;
  position: string;
  employmentType: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  currentlyWorking: boolean;
  description: string[];
  technologies: string[];
  companyLogo: string;
  order: number;
}

const experienceSchema = new Schema<IExperience>(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    employmentType: {
      type: String,
      default: "Full-time",
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      default: null,
    },

    currentlyWorking: {
      type: Boolean,
      default: false,
    },

    description: {
      type: [String],
      default: [],
    },

    technologies: {
      type: [String],
      default: [],
    },

    companyLogo: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IExperience>(
  "Experience",
  experienceSchema
);