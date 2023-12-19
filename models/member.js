import mongoose, { Schema } from "mongoose";

const memberSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        fatherName: {
            type: String,
            required: true,
        },
        motherName: {
            type: String,
            required: true,
        },
        birthDate: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        schoolName: {
            type: String,
            required: true,
        },
        grade: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Member = mongoose.models.Member || mongoose.model("Member", memberSchema);

export default Member;