import { Schema, model, Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  slug: string;
  desc: string;
  coverImage: string;
  tag: string;
  points: string[];
  category: string;
  stack: string[];
  github?: string;
  url?: string;
  figmaUrl?: string;
  featured: boolean;
  order: number;
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    desc: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
      default: "",
    },

    tag: {
      type: String,
      default: "",
    },

    points: {
      type: [String],
      default: [],
    },

    category: {
      type: String,
      default: "Web",
    },

    stack: {
      type: [String],
      default: [],
    },

    github: {
      type: String,
      default: "",
    },

    url: {
      type: String,
      default: "",
    },

    figmaUrl: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
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

export default model<IProject>("Project", projectSchema);