import { Schema, model, Document } from "mongoose";

export interface ICertification extends Document {
  name: string;
  issuer: string;
  description: string;
  url: string;
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
  },
  {
    timestamps: true,
  },
);

export default model<ICertification>("Certification", certificationSchema);
