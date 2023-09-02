"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
type UserSignup = {
  username: string;
  email: string;
  phone: string;
  password: string;
};
export default function RegisterForm() {
  const initialUserSignup = {
    username: "",
    email: "",
    phone: "",
    password: "",
  };
  const [userSignup, setUserSignup] = useState<UserSignup>(initialUserSignup);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!userSignup.username || !userSignup.email || !userSignup.password) {
      setError("All fields are necessary.");
      return;
    }
    const email = userSignup.email;
    try {
      const resUserExists = await fetch("/fetch/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const finduser = await resUserExists.json();
      // console.log("finduser: ", finduser);

      if (finduser.user) {
        setError("User already exists.");
        return;
      } else {
        // console.log("calling signup...");

        const res = await fetch("/fetch/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userSignup),
        });

        if (res.ok) {
          const form = e.target;
          form.reset();
          router.push("/");
        } else {
          console.log("User registration failed.");
        }
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="">
      <div className="shadow-lg px-5 rounded-lg w-2/3 py-10">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) =>
              setUserSignup({ ...userSignup, username: e.target.value })
            }
            type="text"
            placeholder="Username"
          />
          <input
            onChange={(e) =>
              setUserSignup({ ...userSignup, email: e.target.value })
            }
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) =>
              setUserSignup({ ...userSignup, phone: e.target.value })
            }
            type="text"
            placeholder="Phone"
          />
          <input
            onChange={(e) =>
              setUserSignup({ ...userSignup, password: e.target.value })
            }
            type="password"
            placeholder="Password"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Register
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/login"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
