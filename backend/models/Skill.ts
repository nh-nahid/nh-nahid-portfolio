import { Schema, model, Document } from "mongoose";

export interface ISkillCategory {
  title: string;
  items: string[];
}

export interface ISkill extends Document {
  sectionTitle: string;
  heading: string;
  description: string;
  orbitTools: string[];
  toolbox: string[];
  categories: ISkillCategory[];
}

const skillCategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    items: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const skillSchema = new Schema<ISkill>(
  {
    sectionTitle: {
      type: String,
      default: "",
    },

    heading: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    orbitTools: {
      type: [String],
      default: [],
    },

    toolbox: {
      type: [String],
      default: [],
    },

    categories: {
      type: [skillCategorySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default model<ISkill>("Skill", skillSchema);
