import { Schema, model } from "mongoose";
const skillCategorySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    items: {
        type: [String],
        default: [],
    },
}, { _id: false });
const skillSchema = new Schema({
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
}, {
    timestamps: true,
});
export default model("Skill", skillSchema);
