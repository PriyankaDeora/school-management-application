"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { VscSignIn } from "react-icons/vsc";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target.value;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen bg-cyan-950">
      <div className="shadow-lg p-5 rounded-lg bg-cyan-800">
        <h1 className="text-xl font-bold my-4 flex justify-center text-white">Sign Up</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Username"
            className="w-[400px] border border-gray-200 py-2 px-6 focus:outline-none focus:border-cyan-500"

          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="w-[400px] border border-gray-200 py-2 px-6 focus:outline-none focus:border-cyan-500"

          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-[400px] border border-gray-200 py-2 px-6 focus:outline-none focus:border-cyan-500"

          />
          <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold cursor-pointer px-6 py-2 flex items-center gap-2 justify-center">
          Sign Up <VscSignIn size={20}/>
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right text-white" href={"/"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}