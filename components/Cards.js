"use client";

import { FaArrowUp } from "react-icons/fa";
import { BiSolidDollarCircle } from "react-icons/bi";
import { PiStudent } from "react-icons/pi";
import { FaUserTie } from "react-icons/fa";
import { useEffect, useState } from "react";

const GetStudent = async (role) => {
  try {
    const res = await fetch('http://localhost:3000/api/members', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch member');
    }

    const { members } = await res.json();

    const filteredMembers = members.filter((member) => member.role === role);

    return filteredMembers.length;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export default function Cards() {

  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);

  useEffect(() => {
    const fetchTotalStudents = async () => {
      const total = await GetStudent('Student');
      const teachers = await GetStudent('Teacher');
      setTotalStudents(total);
      setTotalTeachers(teachers);
    };

    fetchTotalStudents();
  }, []);
  return (
    <div className="grid lg:grid-cols-3 gap-5 md:grid-cols-2 sm:grid-cols-1">
      <div className="bg-white text-[#1b5151] rounded-lg flex justify-between items-center shadow-md shadow-slate-500">
        <div className="flex flex-col py-8 px-10 gap-3">
          <h3 className="font-bold text-xl">Total Students</h3>
          <div className="text-cyan-400 font-bold text-3xl">{totalStudents}</div>
          <div className="text-gray-500 flex items-center gap-2"><FaArrowUp size={14} /> 5%</div>
        </div>
        <PiStudent size={75} className="m-5 text-white  bg-[#1b5151] rounded-full p-2" />
      </div>
      <div className="bg-white text-[#1b5151] rounded-lg flex justify-between items-center shadow-md shadow-slate-500">
        <div className="flex flex-col py-8 px-10 gap-3">
          <h3 className="font-bold text-xl">Profit</h3>
          <div className="text-cyan-400 font-bold text-3xl">$5000</div>
          <div className="text-gray-500 flex items-center gap-2"><FaArrowUp size={14} /> 8%</div>
        </div>
        <BiSolidDollarCircle size={90} className="m-5" />
      </div>
      <div className="bg-white text-[#1b5151] rounded-lg flex justify-between items-center shadow-md shadow-slate-500">
        <div className="flex flex-col py-8 px-10 gap-3">
          <h3 className="font-bold text-xl">Total Staff</h3>
          <div className="text-cyan-400 font-bold text-3xl">{totalTeachers}</div>
          <div className="text-gray-500 flex items-center gap-2"><FaArrowUp size={14} /> 4%</div>
        </div>
        <FaUserTie size={75} className="m-5 text-white  bg-[#1b5151] rounded-full p-4" />
      </div>
    </div>
  )
}
