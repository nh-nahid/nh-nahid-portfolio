import { Schema, model } from "mongoose";
const skillSchema = new Schema({
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
    order: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
export default model("Skill", skillSchema);
