"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@/hook/useAuth";
import { ScaleLoader } from "react-spinners";
const Page = () => {
  const { setauth } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      company: "",
      image: [],
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("company", data.company);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `https://resme-backend-production.up.railway.app/api/hr/signup`,
        formData,
        {
          headers: {
            "Content-Type": `${
              data.image ? "multipart/form-data" : "application/json"
            }`,
          },
        }
      );

      if (res) {
        setLoading(false);
        toast.success(res?.data?.message);
        const { token, user } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setauth({ token, user });

        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("An Error Occured");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-transparent text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold arc text-teal-800">
                Sign Up
              </h1>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full pop px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        placeholder="Name"
                        required
                      />
                    )}
                  />

                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full pop px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="email"
                        placeholder="Email"
                      />
                    )}
                  />

                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full pop px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="password"
                        placeholder="Password"
                      />
                    )}
                  />

                  <Controller
                    name="company"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="w-full mt-5 pop px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        placeholder="Company"
                        required
                      />
                    )}
                  />
                  <fieldset className="border border-gray-400 rounded p-4 mt-3">
                    <legend className="text-sm font-semibold text-gray-700 px-2">
                      <abbr title="It's not mandatory but you can't add it later">
                        Profile Picture
                      </abbr>
                    </legend>
                    <Controller
                      name="image"
                      control={control}
                      defaultValue={null}
                      render={({ field: { onChange } }) => (
                        <input
                          type="file"
                          id="image"
                          name="image"
                          accept="image/*"
                          className="w-full"
                          onChange={(e) => onChange(e.target.files)}
                        />
                      )}
                    />
                  </fieldset>

                  <button
                    className="mt-5 tracking-wide font-semibold bg-teal-600 text-gray-100 w-full py-4 rounded-lg hover:bg-teal-900 hover:cursor-pointer transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
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
                      {loading ? (
                        <>
                          <div className="flex items-center justify-center">
                            Loading
                            <ScaleLoader loading={loading} color="white" />
                          </div>
                        </>
                      ) : (
                        "Sign Up"
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
