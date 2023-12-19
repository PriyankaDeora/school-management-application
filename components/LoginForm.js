"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CiLogin } from "react-icons/ci";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen bg-cyan-950">
      <div className="shadow-lg p-5 rounded-lg bg-cyan-800">
        <h1 className="text-xl font-bold my-4 flex justify-center text-white">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="w-[400px] border border-gray-200 py-2 px-6 bg-white focus:outline-none focus:border-cyan-500"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-[400px] border border-gray-200 py-2 px-6 bg-white focus:outline-none focus:border-cyan-500"
          />
          <button className="bg-cyan-600 hover:bg-cyan-500 text-white flex items-center justify-center gap-2 font-bold cursor-pointer px-6 py-2">
            Login <CiLogin size={20}/>
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right text-white" href={"/register"}>
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}