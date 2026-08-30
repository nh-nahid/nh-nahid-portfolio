import { Schema, model } from "mongoose";
const experienceSchema = new Schema({
    company: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        trim: true,
    },
    employmentType: {
        type: String,
        default: "Full-time",
        trim: true,
    },
    location: {
        type: String,
        default: "",
        trim: true,
    },
    period: {
        type: String,
        default: "",
        trim: true,
    },
    points: {
        type: [String],
        default: [],
    },
    technologies: {
        type: [String],
        default: [],
    },
    companyLogo: {
        type: String,
        default: "",
    },
    currentlyWorking: {
        type: Boolean,
        default: false,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
        default: null,
    },
    order: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
export default model("Experience", experienceSchema);
