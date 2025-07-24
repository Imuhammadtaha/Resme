"use client";
import Image from "next/image";
import { useRef } from "react";
import { LuUpload } from "react-icons/lu";
import { SlBookOpen } from "react-icons/sl";
import { useAuth } from "@/hook/useAuth";
import { useRouter } from "next/navigation";

export default function Home() {
  const {auth}  = useAuth();
  const router = useRouter();
  const fileInputRef = useRef(null);

  return (
    <>
      <div className="w-full flex flex-col md:flex-row items-center gap-8 px-4 md:px-10 ">
        {/* TEXT SECTION */}
        <div className="md:w-1/2 w-full text-center md:text-left pt-19 ">
          <h2 className="md:text-4xl text-3xl">
            <span className="arc font-extrabold">
              Scan Smarter, Hire Faster — Let AI Shortlist.
            </span>
          </h2>
          <p className="inter md:text-lg text-md my-2">
            Our AI Resume Scanner helps HR professionals save hours by instantly
            analyzing up to 10 resumes at once, highlighting key skills,
            experiences, and qualifications. No more manual filtering.
          </p>
          <div className="pop">
           

            <button
              onClick={()=> auth && auth?.token ? router.push("/process"):router.push("/login")}
              className="p-4 w-50 bg-teal-600 text-white md:mx-1 my-1 cursor-pointer"
            >
              <div className="flex items-center justify-center">
                Scan Now
                <LuUpload className="mx-1.5" />
              </div>
            </button>

            <button className="p-4 w-50 bg-white text-teal-600 md:mx-1 my-1 border-2 border-teal-700 cursor-not-allowed">
              <div className="flex items-center justify-center">
                Learn More <SlBookOpen className="mx-1.5" />
              </div>
            </button>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="hidden md:flex md:w-1/2 justify-center">

          <Image
            src="https://res.cloudinary.com/dr3vqhabz/image/upload/v1752737827/Profile-Pictures/1752737825211_undraw_team-page_q5am.svg.webp"
            alt="Res img"
            width={1000}
            height={1000}
            className="w-full h-auto max-w-md"
          />
        </div>
      </div>
    </>
  );
}
