import { Schema, model, Document } from "mongoose";

export interface IProfile extends Document {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  about: string;
  
  email: string;
  phone: string;
  location: string;

  avatar: string;
  resume: string;

  github: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
}

const profileSchema = new Schema<IProfile>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      default: "",
      trim: true,
    },

    bio: {
      type: String,
      default: "",
      trim: true,
    },
    about: {
  type: String,
  default: "",
},

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
      trim: true,
    },

    linkedin: {
      type: String,
      default: "",
      trim: true,
    },

    facebook: {
      type: String,
      default: "",
      trim: true,
    },

    instagram: {
      type: String,
      default: "",
      trim: true,
    },

    twitter: {
      type: String,
      default: "",
      trim: true,
    },

    website: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IProfile>("Profile", profileSchema);