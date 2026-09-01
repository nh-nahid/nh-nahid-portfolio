import { Schema, model, Document } from "mongoose";

export interface ICertification extends Document {
  name: string;
  issuer: string;
  description: string;
  url: string;
  coverImage?: string;
  order?: number;
}

const certificationSchema = new Schema<ICertification>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    issuer: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },

    url: {
      type: String,
      default: "",
      trim: true,
    },

    coverImage: {
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
  },
);

export default model<ICertification>("Certification", certificationSchema);
