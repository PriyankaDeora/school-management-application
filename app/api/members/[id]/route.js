import connectMongoDB from "@/libs/mongodb";
import Member from "@/models/member";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const {newUserName: userName, newFatherName: fatherName, newMotherName: motherName, newBirthDate: birthDate, newRole: role, newEmail: email, newSchoolName: schoolName, newGrade: grade, newPhone: phone, newGender: gender} = await request.json();
    await connectMongoDB();
    await Member.findByIdAndUpdate(id, {userName, fatherName, motherName, birthDate, role, email, schoolName, grade, phone, gender});
    return NextResponse.json({message: "Member edited"}, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const member = await Member.findOne({_id: id});
    return NextResponse.json({ member }, { status: 200 });
} 