"use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// // import { GrUserExpert } from "react-icons/gr";

// function MemberForm() {
//     const [userName, setUserName] = useState("");
//     const [fatherName, setFatherName] = useState("");
//     const [motherName, setMotherName] = useState("");
//     const [birthDate, setBirthDate] = useState("");
//     const [role, setRole] = useState("");
//     const [email, setEmail] = useState("");
//     const [schoolName, setSchoolName] = useState("");
//     const [grade, setGrade] = useState("");
//     const [phone, setPhone] = useState("");
//     const [gender, setGender] = useState("");

//     const router = useRouter();

//     const handleGenderChange = (e) => {
//         setGender(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const res = await fetch('http://localhost:3000/api/members', {
//                 method: "POST",
//                 headers: {
//                     "Content-type": "application/json"
//                 },
//                 body: JSON.stringify({ userName, fatherName, motherName, birthDate, role, email, schoolName, grade, phone, gender }),
//             });

//             if (res.ok) {
//                 router.push('/memberlist')
//             } else {
//                 throw new Error('Failed to create member');
//             }
//             router.refresh();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <div className="flex-1 p-5 lg:ml-60 md:ml-16 sm:ml-14 ml-12 mt-16">
//             <div className="w-full">
//                 <div className="bg-white shadow-md shadow-cyan-950 p-5 rounded-lg">
//                     <h1 className="text-2xl font-bold mb-4 flex justify-center shadow-sm shadow-cyan-800 p-2">Add Member</h1>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="mb-4 gap-2">
//                             <label htmlFor="userName" className="block font-semibold text-gray-600">Student&apos;s Name :</label>
//                             <input
//                                 type="text"
//                                 value={userName}
//                                 onChange={(e) => setUserName(e.target.value)}
//                                 id="userName"
//                                 required
//                                 placeholder="Enter Your Name"
//                                 className="block w-full bg-slate-100 rounded border-gray-300 border p-2 focus:outline-none focus:border-cyan-500"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="fatherName" className="block font-semibold text-gray-600">Father&apos;s Name :</label>
//                             <input
//                                 type="text"
//                                 value={fatherName}
//                                 onChange={(e) => setFatherName(e.target.value)}
//                                 id="fatherName"
//                                 required
//                                 placeholder="Enter Father&apos;s Name"
//                                 className="block w-full bg-slate-100 rounded border-gray-300 border p-2 focus:outline-none focus:border-cyan-500"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="motherName" className="block font-semibold text-gray-600">Mother&apos;s Name :</label>
//                             <input
//                                 type="text"
//                                 value={motherName}
//                                 onChange={(e) => setMotherName(e.target.value)}
//                                 id="motherName"
//                                 required
//                                 placeholder="Enter Mother&apos;s Name"
//                                 className="block w-full bg-slate-100 rounded border-gray-300 border p-2 focus:outline-none focus:border-cyan-500"
//                             />
//                         </div>
//                         <div className="flex w-full gap-2">
//                             <div className="mb-4 w-1/2">
//                                 <label htmlFor="birthDate" className="block font-semibold text-gray-600">Date of Birth :</label>
//                                 <input
//                                     type="date"
//                                     value={birthDate}
//                                     onChange={(e) => setBirthDate(e.target.value)}
//                                     id="birthDate"
//                                     required
//                                     placeholder="Date of birth"
//                                     className="block w-full bg-slate-100 rounded border-gray-300 border p-2 focus:outline-none focus:border-cyan-500"
//                                 />
//                             </div>
//                             <div className="mb-4 w-1/2">
//                                 <label htmlFor="role" className="block font-semibold text-gray-600">Role :</label>
//                                 <select
//                                 name="role"
//                                 id="role"
//                                 value={role}
//                                 onChange={(e) => setRole(e.target.value)}
//                                 className="block w-full bg-slate-100 rounded border-gray-300 border p-2 focus:outline-none focus:border-cyan-500"
//                                 >
//                                     <option value="Select">Select</option>
//                                     <option value="Student">Student</option>
//                                     <option value="Principal">Principal</option>
//                                     <option value="Teacher">Teacher</option>
//                                     <option value="Librarian">Librarian</option>
//                                 </select>
//                             </div>
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="email" className="block font-semibold text-gray-600">Email ID :</label>
//                             <input
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 id="email"
//                                 required
//                                 placeholder="Enter your Email"
//                                 className="block w-full bg-slate-100 rounded border-gray-300 border p-2 focus:outline-none focus:border-cyan-500"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="schoolName" className="block font-semibold text-gray-600">School/College/Institute :</label>
//                             <input
//                                 type="text"
//                                 value={schoolName}
//                                 onChange={(e) => setSchoolName(e.target.value)}
//                                 id="schoolName"
//                                 required
//                                 placeholder="Enter your Institute"
//                                 className="block w-full bg-slate-100 rounded border-gray-300 border p-2 focus:outline-none focus:border-cyan-500"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="grade" className="block font-semibold text-gray-600">Grade/Year :</label>
//                             <input
//                                 value={grade}
//                                 onChange={(e) => setGrade(e.target.value)}
//                                 id="grade"
//                                 required
//                                 placeholder="Enter your Grade/Year"
//                                 className="block w-full bg-slate-100 rounded border-gray-300 border p-2 focus:outline-none focus:border-cyan-500"
//                             />
//                         </div>
//                         <div className="flex gap-5 mb-4">
//                             <div className="flex items-center gap-2">
//                                 <label htmlFor="phone" className="block font-semibold text-gray-600">Phone :</label>
//                                 <input
//                                     type="number"
//                                     value={phone}
//                                     onChange={(e) => setPhone(e.target.value)}
//                                     id="phone"
//                                     required
//                                     placeholder="Phone number"
//                                     className="Inline bg-slate-100 w-3/4 rounded border-gray-300 border p-2 focus:outline-none focus:border-cyan-500"
//                                 />
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <label htmlFor="gender" className="Inline-block font-semibold text-gray-600">Gender :</label>
//                                 <div className="flex gap-2">
//                                     <div className="flex gap-1">
//                                         <input
//                                             type="radio"
//                                             name="gender"
//                                             value="male"
//                                             id="male"
//                                             checked={gender === 'male'}
//                                             onChange={handleGenderChange}
//                                         />
//                                         <label htmlFor="male">Male</label>
//                                     </div>

//                                     <div className="flex gap-1">
//                                         <input
//                                             type="radio"
//                                             name="gender"
//                                             value="female"
//                                             id="female"
//                                             checked={gender === 'female'}
//                                             onChange={handleGenderChange}
//                                         />
//                                         <label htmlFor="female">Female</label>
//                                     </div>

//                                     <div className="flex gap-1">
//                                         <input
//                                             type="radio"
//                                             name="gender"
//                                             value="other"
//                                             id="other"
//                                             checked={gender === 'other'}
//                                             onChange={handleGenderChange}
//                                         />
//                                         <label htmlFor="other">Other</label>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="flex items-center justify-center">
//                                 <button className="bg-cyan-800 text-white py-2 px-4 rounded hover:bg-secondary transition duration-300 flex items-center gap-2 justify-center" type="submit">Submit</button>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default MemberForm


import React from 'react';
import { RJSFSchema, UiSchema, FieldProps, RegistryFieldsType } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { useRouter } from "next/navigation";
import { useState } from "react";
// import Form from "@rjsf/core";
import Form from '@rjsf/mui';

const schema = {
  "type": "object",
  "required": [
    "userName",
    "fatherName",
    "motherName",
    "birthDate",
    "role",
    "email",
    "schoolName",
    "phone",
    "gender"
  ],
  "properties": {
    "userName": {
      "type": "string",
      "title": "Name"
    },
    "fatherName": {
      "type": "string",
      "title": "Father Name"
    },
    "motherName": {
      "type": "string",
      "title": "Mother Name"
    },
    "birthDate": {
      "type": "string",
      "title": "DOB",
      "format": "date"
    },
    "role": {
      "type": "string",
      "title": "Role",
      "enum": [
        "Student",
        "Teacher",
        "Principal",
        "Librarian"
      ]
    },
    "email": {
      "type": "string",
      "title": "Email"
    },
    "schoolName": {
      "type": "string",
      "title": "School/College/Institute"
    },
    "grade": {
      "type": "string",
      "title": "Grade/Year"
    },
    "phone": {
      "type": "string",
      "title": "Phone",
      "minLength": 10
    },
    "gender": {
      "type": "string",
      "title": "Gender",
      "enum": [
        "male",
        "female",
        "other"
      ]
    }
  }
};

const uiSchema = {
  "userName": {
    "ui:autofocus": true,
    "ui:placeholder": "Enter your Name"
  },
  "fatherName": {
    "ui:placeholder": "Enter your Father name"
  },
  "motherName": {
    "ui:placeholder": "Enter your Mother name"
  },
  "role": {
    "ui:placeholder": "Select your Role",
    "ui:widget": "select",
    "ui:options": {
      "enumOptions": [
        {
          "label": "Student",
          "value": "Student"
        },
        {
          "label": "Teacher",
          "value": "Teacher"
        },
        {
          "label": "Principal",
          "value": "Principal"
        },
        {
          "label": "Librarian",
          "value": "Librarian"
        }
      ]
    }
  },
  "email": {
    "ui:placeholder": "Enter your Email",
    "inputType": "email"
  },
  "schoolName": {
    "ui:placeholder": "Enter your School name"
  },
  "grade": {
    "ui:placeholder": "Enter your Grade"
  },
  "phone": {
    "ui:placeholder": "Enter your Number",
    "ui:options": {
      "inputType": "tel"
    }
  },
  "gender": {
    "ui:widget": "radio",
    "ui:options": {
      "inline": true
    }
  }
};

function MemberForm() {
  const [formData, setFormData] = React.useState({});

  const router = useRouter();

  const onSubmit = async (data,e) => {
    console.log(data.formData);
    const { userName, fatherName, motherName, birthDate, role, email, schoolName, grade, phone, gender } = data.formData
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/members', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ userName, fatherName, motherName, birthDate, role, email, schoolName, grade, phone, gender }),
      });

      if (res.ok) {
        router.push('/memberlist')
      } else {
        throw new Error('Failed to create member');
      }
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 p-5 lg:ml-60 md:ml-16 sm:ml-14 ml-12 mt-16">
      <div className="w-full">
        <div className="bg-white shadow-md shadow-cyan-950 p-5 rounded-lg">
          <h1 className="text-2xl font-bold mb-4 flex justify-center shadow-sm shadow-cyan-800 p-2">Add Member</h1>
          <Form schema={schema} uiSchema={uiSchema} validator={validator} onSubmit={onSubmit} formData={formData} onChange={(data) => setFormData(data.formData)} />
        </div>
      </div>
    </div>
  );
}

export default MemberForm;