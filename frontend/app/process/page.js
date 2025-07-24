"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [jd, setJD] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jd || files.length === 0) {
      alert("Please provide Job Description and at least one PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("jd", jd);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/file/upload-resumes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        toast.success("Process Completed");
       localStorage.setItem("rankedResults", JSON.stringify(response.data.rankedResults));

      router.push("/result");
       setTimeout(() => {
      localStorage.setItem('rankedResults', JSON.stringify(null));
    }, 60 * 60 * 1000); 
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An error occurred while uploading.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const messages = [
    "Process is running please wait! ",
    "Be Patient! ",
    "Loading time depends on file size and your internet!",
    "This is just for your ease. We regret any inconveniance!",
  ];
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setCurrentMsgIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <>
      {loading ? (
        <>
          <div className="w-full h-screen z-0 flex items-center justify-center">
            <div className="block text-center justify-center">
              <PuffLoader
                loading={loading}
                size={150}
                color="white"
                className="justify-center mx-auto"
              />
              <p className="pop italic mt-4">{messages[currentMsgIndex]}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full min-h-screen flex items-center justify-center bg-transparent p-4">
            <div className="bg-white text-black shadow-xl rounded-xl p-8 max-w-2xl w-full space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 text-center pop">
                Upload Resumes & Job Description
              </h2>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <label className="block text-sm font-medium text-gray-600 pop">
                  Job Description
                </label>
                <textarea
                  rows={6}
                  placeholder="Enter job description here..."
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={jd}
                  onChange={(e) => setJD(e.target.value)}
                  required
                />

                <label className="block text-sm font-medium text-gray-600">
                  Upload PDF Resumes
                </label>
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={(e) => setFiles(e.target.files)}
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                  disabled={loading}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
