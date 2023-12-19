"use client";

import { HiPencilAlt } from "react-icons/hi";
import Nav from "../../components/nav";
import RemoveBtn from "../../components/RemoveBtn";
import Link from "next/link";
import Navbar from "@/components/navbar";
import React, { useState, useEffect } from 'react';
import { FiFilter } from "react-icons/fi";
import { FaWindowClose } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import Modal from 'react-modal';
import ReactPaginate from 'react-paginate';

export const getMembers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/members", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading members: ", error);
  }
};

const schema= {
  "title": "Filter",
  "type": "object",
  "properties": {
    "role": {
      "type": "string",
      "title": "Role",
      "enum": ["Student", "Principal", "Librarian", "Teacher"]
    },
    "grade": {
      "type": "string",
      "title": "Grade",
      "enum": [
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
        "9th",
        "10th",
      ]
    },
    "gender": {
      "type": "string",
      "title": "Gender",
      "enum": ["male", "female", "other"]
    }
  }
}
const uiSchema= {
  "role": {
    "ui:widget": "select"
  },
  "grade": {
    "ui:widget": "select"
  },
  "gender": {
    "ui:widget": "select"
  }
}

function Members() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [filters, setFilters] = useState({
    role: "",
    grade: "",
    gender: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { members } = await getMembers();
        setMembers(members);
        setFilteredMembers(members);
      } catch (error) {
        console.error("Error fetching members: ", error);
      }
    };

    fetchMembers();
  }, []);


  const pageCount = Math.ceil(members.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedMembers = members.filter((member) => {return search.toLowerCase() === '' ? member : member.userName.toLowerCase().includes(search)}).slice(startIndex, endIndex);

  const applyFilters = () => {

    let filtered = [...members];

    if (filters.gender !== "") {
      filtered = filtered.filter((member) => member.gender === filters.gender);
    }
    if (filters.role !== "") {
      filtered = filtered.filter((member) => member.role === filters.role);
    }
    if (filters.grade !== "") {
      filtered = filtered.filter((member) => member.grade === filters.grade);
    }

    setFilteredMembers(filtered);
  };

  const handleFilterChange = (fieldName, value) => {
    setFilters({
      ...filters,
      [fieldName]: value,
    });
  };

  useEffect(() => {
    applyFilters();
    closeModal();
  }, [filters]);

  const mergedData = [...new Set([...filteredMembers, ...displayedMembers])];
  const paginatedData = mergedData.slice(startIndex, endIndex);

  return (
    <div className="flex bg-slate-300">
      <Nav />

      <Navbar />


      <div className="flex-1 overflow-auto lg:ml-60 md:ml-16 sm:ml-14 ml-12 mt-16">
        <div className="p-10 bg-slate-100 border m-5 rounded-lg shadow-md shadow-cyan-950">
          <div className="flex justify-center p-2 text-2xl mb-5 font-bold shadow-cyan-900 shadow-sm bg-white">
            Member&apos;s List
          </div>

          {/* <Filter /> */}
          <div className="flex items-center mb-4 justify-end gap-2">
            <div className="flex items-center">
              <input
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 p-1 shadow  m-1"
                placeholder="Search Student..."
              />
              <IoSearch size={32} className="text-gray-500 bg-white border border-gray-300 shadow p-1 cursor-pointer" />
            </div>
            <span className="bg-white text-gray-500 p-1 flex items-center justify-center gap-2 shadow-md cursor-pointer border border-gray-300" onClick={openModal}><FiFilter size={20} />Filter</span>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="w-1/4 h-1/3 bg-[#1b5151] text-white mx-auto mt-56 p-10 rounded-md shadow-md shadow-slate-700">
              <div className="flex justify-end">
                <button onClick={closeModal} className="text-red-500"><FaWindowClose size={24} /></button>
              </div>
              <h2 className="m-2 text-xl flex justify-center mb-6">Filter by:</h2>

              <div className="m-2 flex justify-between">
                <label className="text-lg font-medium font-sans">Role:</label>
                <select
                  value={filters.role}
                  onChange={(e) => handleFilterChange('role', e.target.value)}
                  className="text-black w-24"
                >
                  <option value="">Select</option>
                  <option value="Student">Student</option>
                  <option value="Principal">Principal</option>
                  <option value="Librarian">Librarian</option>
                  <option value="Teacher">Teacher</option>
                </select>
              </div>
              <div className="m-2 flex gap-3 justify-between">
                <label className="text-lg font-medium font-sans">Grade:</label>
                <select
                  value={filters.grade}
                  onChange={(e) => handleFilterChange('grade', e.target.value)}
                  className="text-black w-24"
                >
                  <option value="">Select</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                  <option value="5th">5th</option>
                  <option value="6th">6th</option>
                  <option value="7th">7th</option>
                  <option value="8th">8th</option>
                  <option value="9th">9th</option>
                  <option value="10th">10th</option>
                </select>
              </div>
              <div className="m-2 flex gap-3 justify-between">
                <label className="text-lg font-medium font-sans">Gender:</label>
                <select
                  value={filters.gender}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                  className="text-black w-24"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
            </Modal>
          </div>

          <div className="overflow-x-auto">
            <table className="table-auto min-w-full border-collapse border border-slate-500">
              <thead>
                <tr className="bg-[#1b5151] text-white">
                  <th className="border border-gray-300 px-4 py-1">
                    Student&apos;s Name
                  </th>
                  <th className="border border-gray-300 px-4 py-1">
                    Father&apos;s Name
                  </th>
                  <th className="border border-gray-300 px-4 py-1">
                    Mother&apos;s Name
                  </th>
                  <th className="border border-gray-300 px-4 py-1">DOB</th>
                  <th className="border border-gray-300 px-4 py-1">Role</th>
                  <th className="border border-gray-300 px-4 py-1">Email ID</th>
                  <th className="border border-gray-300 px-4 py-1">
                    School/College/Institute
                  </th>
                  <th className="border border-gray-300 px-4 py-1">Grade/Year</th>
                  <th className="border border-gray-300 px-4 py-1">Phone</th>
                  <th className="border border-gray-300 px-4 py-1">Gender</th>
                  <th className="border border-gray-300 px-4 py-1">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {paginatedData
                .filter((member) => {
                  return search.toLowerCase() === ''
                    ? member
                    : member.userName.toLowerCase().includes(search) || 
                    member.fatherName.toLowerCase().includes(search) ||
                    member.motherName.toLowerCase().includes(search) ||
                    member.email.toLowerCase().includes(search) ||
                    member.phone.toLowerCase().includes(search) ||
                    member.birthDate.toLowerCase().includes(search) ||
                    member.schoolName.toLowerCase().includes(search);
                })
                .map((t) => (
                  <tr key={t._id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {t.userName}  
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {t.fatherName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {t.motherName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {t.birthDate}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {t.role}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {t.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {t.schoolName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {t.grade}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {t.phone}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {t.gender}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex gap-2">
                        <Link href={`editMember/${t._id}`}>
                          <HiPencilAlt size={24} className="text-cyan-700" />
                        </Link>
                        <RemoveBtn id={t._id} />
                      </div>
                    </td>
                  </tr>
                ))
                }


              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-5">
            <ReactPaginate
              previousLabel={'<<'}
              nextLabel={'>>'}
              breakLabel={'...'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={changePage}
              containerClassName={'pagination flex space-x-2'}
              pageClassName={'px-3 py-2 rounded cursor-pointer hover:bg-[#1b5151] hover:text-white'}
              previousClassName={'px-3 py-2 rounded cursor-pointer'}
              nextClassName={'px-3 py-2 rounded cursor-pointer'}
              breakClassName={'px-3 py-2 rounded cursor-pointer hover:bg-[#1b5151] hover:text-white'}
              activeClassName={'bg-[#1b5151] text-white'}
              disabledClassName={'text-gray-400'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Members;
