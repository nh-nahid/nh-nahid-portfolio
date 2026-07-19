import { Schema, model } from "mongoose";
const experienceSchema = new Schema({
    company: {
        type: String,
        required: true,
        trim: true,
    },
    position: {
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
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        default: null,
    },
    currentlyWorking: {
        type: Boolean,
        default: false,
    },
    description: {
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
    order: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
export default model("Experience", experienceSchema);
