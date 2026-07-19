import mongoose, { Schema } from "mongoose";
const statSchema = new Schema({
    value: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
}, {
    _id: false,
});
const homeSchema = new Schema({
    stats: {
        type: [statSchema],
        default: [],
    },
}, {
    timestamps: true,
});
export default mongoose.model("Home", homeSchema);
