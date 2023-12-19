"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { TbUserPlus } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { SlCalender } from "react-icons/sl";
import { FaRegUserCircle, FaListUl, FaPowerOff } from "react-icons/fa";

function Nav() {
  return (
      <div className="lg:w-60 md:w-16 sm:w-14 w-12 bg-[#1b5151] text-white lg:h-screen md:h-full sm:h-full h-full fixed top-0 left-0 flex flex-col justify-between">
        <nav>
          <h1 className="p-5 text-xl font-bold flex items-center justify-center">ADMIN</h1>
          <ul className="text-xl font-semibold">
            <hr />
            <li className="p-2 m-2 hover:bg-[#316565]">
              <Link href="/dashboard" className="flex items-center gap-4">
                <RxDashboard size={20} />
                <div className="hidden lg:inline-block">Dashboard</div>
              </Link>
            </li>
            <hr />
            <li className="p-2 m-2 hover:bg-[#316565]">
              <Link href="/addMember" className="flex items-center gap-4">
              <TbUserPlus size={20} />
                <div className="hidden lg:inline-block">Add Member</div>
              </Link>
            </li>
            <hr />
            <li className="p-2 m-2 hover:bg-[#316565]">
              <Link href="/memberlist" className="flex items-center gap-4">
              <FaListUl size={20} />
                <div className="hidden lg:inline-block">Member List</div>
              </Link>
            </li>
            <hr />
            <li className="p-2 m-2 hover:bg-[#316565]">
              <Link href="/Profile" className="flex items-center gap-4">
              <FaRegUserCircle size={20} />
                <div className="hidden lg:inline-block">Profile</div>
              </Link>
            </li>
            <hr />
            <li className="p-2 m-2 hover:bg-[#316565]">
              <Link href="/Calender" className="flex items-center gap-4">
              <SlCalender size={20} />
                <div className="hidden lg:inline-block">Calender</div>
              </Link>
            </li>
            <hr />
            <li className="p-2 m-2 hover:bg-[#316565]">
              <Link href="/" className="flex items-center gap-4">
              <FaPowerOff size={20} />
                <div className="hidden lg:inline-block" onClick={() => signOut()}>LogOut</div>
              </Link>
            </li>
            <hr />
          </ul>
        </nav>
        {/* <div className="pb-8">
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white m-4 px-2 py-2 rounded hover:bg-red-600 flex items-center justify-center gap-2">
            <span className="hidden lg:inline-block">LogOut</span> <FaPowerOff />
          </button>
        </div> */}
      </div>
  );
}

export default Nav;
