import { Schema, model } from "mongoose";
const projectSchema = new Schema({
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
}, {
    timestamps: true,
});
export default model("Project", projectSchema);
