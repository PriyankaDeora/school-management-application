import connectMongoDB from "@/libs/mongodb";
import Member from "@/models/member";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { userName, fatherName, motherName, birthDate, role, email, schoolName, grade, phone, gender } = await request.json();
    await connectMongoDB();
    await Member.create({userName, fatherName, motherName, birthDate, role, email, schoolName, grade, phone, gender});
    return NextResponse.json({message: "Member Added"}, {status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const members = await Member.find();
    return NextResponse.json({ members });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Member.findByIdAndDelete(id);
    return NextResponse.json({message: "Member deleted"}, {status: 200});
}
