import { Schema, model, Document } from "mongoose";

export interface ICourse extends Document {
  name: string;
  platform: string;
  category: string;
  description?: string;
  logo?: string;
  order: number;
}

const courseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    platform: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    logo: {
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

export default model<ICourse>("Course", courseSchema);
