"use client";
import axios from "axios";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import { ScaleLoader } from "react-spinners";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setauth } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:5000/api/hr/login`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res) {
        toast.success("Login Successfull");
        const { token, user } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setauth({ token, user });
        setLoading(false);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login Error");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-transparent text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold arc text-teal-800">
                Log In
              </h1>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <input
                    className="w-full pop px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />

                  <input
                    className="w-full pop px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />

                  <button
                    className="mt-5 tracking-wide font-semibold bg-teal-600 text-gray-100 w-full py-4 rounded-lg hover:bg-teal-900 hover:cursor-pointer transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    type="submit"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy={7} r={4} />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3 pop">
                      {" "}
                      {loading ? (
                        <>
                          <div className="flex items-center justify-center">
                            Loading
                            <ScaleLoader loading={loading} color="white" />
                          </div>
                        </>
                      ) : (
                        "Login"
                      )}
                    </span>
                  </button>

                  <p className=" text-xs text-gray-600 text-center mt-1">
                    I agree to abide by templatana&apos;s &nbsp;
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      &nbsp; Terms of Service &nbsp;
                    </a>
                    and its &nbsp;
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")',
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
