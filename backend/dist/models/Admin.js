import { Schema, model } from "mongoose";
const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    phone: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    avatar: {
        type: String,
        default: "",
    },
    refreshToken: {
        type: String,
        default: null,
        select: false,
    },
}, {
    timestamps: true,
});
export default model("Admin", adminSchema);
