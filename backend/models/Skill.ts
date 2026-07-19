import { Schema, model, Document } from "mongoose";

export interface ISkill extends Document {
  name: string;
  category: string;
  icon: string;
  level: number;
  order: number;
}

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    icon: {
      type: String,
      default: "",
      trim: true,
    },

    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 80,
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

export default model<ISkill>("Skill", skillSchema);