import { Document } from "mongoose";

export interface IAuth extends Document {
    name: string;
    email: string;
    password: string;

    avatar?: {
        publicId: string;
        url: string;
    };

    refreshToken?: string | null;
    createdAt: Date;
    updatedAt: Date;
}