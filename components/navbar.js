"use client"

import { CiSearch } from "react-icons/ci";

export default function Navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 z-10 bg-[#1b5151] text-white p-3 lg:w-screen md:w-full sm:w-full w-full">

        <form className="flex flex-row items-center justify-between mr-10">

          <h1 className="text-white text-xl ml-10 uppercase font-semibold">Admin</h1>

          <div className="flex items-center justify-center">

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search here..."
                className="hidden lg:inline-block md:inline-block border-0 px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-64"
              />
              <div className="bg-white text-gray-600 rounded p-2 hidden lg:inline-block md:inline-block">
                <CiSearch size={26} />
              </div>
            </div>

          </div>

        </form>

      </nav>
    </>
  );
}