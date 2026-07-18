import { Schema, model } from "mongoose";
import { IAuth } from "./auth.interface.js";

const authSchema = new Schema<IAuth>(
    {
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

        avatar: {
            publicId: String,
            url: String,
        },

        refreshToken: {
            type: String,
            default: null,
            select: false
        },
    },
    {
        timestamps: true
    }
);

const Auth = model<IAuth>("Admin", authSchema);

export default Auth;