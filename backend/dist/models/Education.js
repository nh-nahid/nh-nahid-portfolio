import { Schema, model } from "mongoose";
const educationSchema = new Schema({
    degree: {
        type: String,
        required: true,
    },
    school: {
        type: String,
        required: true,
    },
    period: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
export default model("Education", educationSchema);
