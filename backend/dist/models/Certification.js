import { Schema, model } from "mongoose";
const certificationSchema = new Schema({
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
    coverImage: {
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
export default model("Certification", certificationSchema);
