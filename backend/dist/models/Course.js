import { Schema, model } from "mongoose";
const courseSchema = new Schema({
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
}, {
    timestamps: true,
});
export default model("Course", courseSchema);
