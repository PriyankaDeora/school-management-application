"use client";

import React, { useState } from 'react';
import { MdSaveAlt } from 'react-icons/md';
import { useRouter } from "next/navigation";
import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/mui';

function EditForm({id, userName, fatherName, motherName, birthDate, email, schoolName, grade, phone, gender}) {
  const [formData, setFormData] = useState({
    newUserName: userName,
    newFatherName: fatherName,
    newMotherName: motherName,
    newBirthDate: birthDate,
    newEmail: email,
    newSchoolName: schoolName,
    newGrade: grade,
    newPhone: phone,
    newGender: gender,
  });

  const router = useRouter();

  const onSubmit = async ({ formData }, e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/members/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to create member');
      }

      router.push("/memberlist");
      router.refresh();

    } catch (error) {
      console.log(error);
    }
  };

  const schema = {
    "type": "object",
    "properties": {
      "newUserName": { "type": "string", "title": "Student's Name" },
      "newFatherName": { "type": "string", "title": "Father's Name" },
      "newMotherName": { "type": "string", "title": "Mother's Name" },
      "newBirthDate": { "type": "string", "format": "date", "title": "Date of Birth" },
      "newEmail": { "type": "string", "format": "email", "title": "Email ID" },
      "newSchoolName": { "type": "string", "title": "School/College/Institute" },
      "newGrade": { "type": "string", "title": "Grade/Year" },
      "newPhone": { "type": "string", "title": "Phone" },
      "newGender": {
        "type": "string",
        "title": "Gender",
        "enum": ["male", "female", "other"],
        "enumNames": ["Male", "Female", "Other"],
      },
    },
  };

  const uiSchema = {
    "newBirthDate": {
      "ui:widget": "date",
    },
    "newPhone": {
        "ui:options": {
            "inputType": "tel"
          }
    },
    "newGender": {
      "ui:widget": "radio",
      "ui:options": {
        "inline": true
      }
    },
  };

  return (
    <div className="flex-1 p-5">
      <div className="w-full">
        <div className="bg-white shadow-md shadow-slate-500 p-5 rounded-lg">
          <h1 className="text-2xl font-bold mb-4 flex justify-center shadow-slate-800 shadow-sm">
            Edit Member
          </h1>
          <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            validator={validator}
            onSubmit={onSubmit}
            onChange={(data) => setFormData(data.formData)}
          >
            <button
              className="bg-cyan-500 text-white py-2 px-4 rounded hover:bg-secondary transition duration-300 flex gap-2 items-center justify-center"
              type="submit"
            >
              Save <MdSaveAlt />
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default EditForm;
