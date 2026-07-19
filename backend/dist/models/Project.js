import { Schema, model } from "mongoose";
const projectSchema = new Schema({
    title: {
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
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    category: {
        type: String,
        default: "Web",
    },
    technologies: {
        type: [String],
        default: [],
    },
    githubUrl: {
        type: String,
        default: "",
    },
    liveUrl: {
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
