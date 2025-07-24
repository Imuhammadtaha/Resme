"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [rankedResults, setRankedResults] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("rankedResults");
    if (data) {
      setRankedResults(JSON.parse(data));
    }
  }, []);

  const shortenSummary = (text, maxLength = 200) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  const scanMore = () => {
    router.push("/process");
    localStorage.setItem(
      "rankedResults",
      JSON.stringify(null)
    );
  };
  return (
    <>
      {rankedResults == null ? (
        <>
          <div className="w-full flex items-center justify-center h-screen font-bold md:text-3xl text-lg ">
            <h1>Session Expired! Scan Again Please :(</h1>
          </div>
        </>
      ) : (
        <>
          <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-teal-700">
              Ranked Resume Results
            </h1>

            {rankedResults.length === 0 ? (
              <p className="text-center text-gray-500">
                No results to display.
              </p>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rankedResults.map((resume, idx) => (
                    <div
                      key={idx}
                      className="bg-white shadow-xl rounded-xl p-6 hover:scale-105 transform transition duration-300"
                    >
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Candidate: {resume.name || "N/A"}
                      </h2>
                      <p className="text-gray-600 mb-1">
                        <strong>Email:</strong> {resume.email}
                      </p>
                      <p className="text-gray-600 mb-3">
                        <strong>Score:</strong>{" "}
                        <span className="font-bold text-green-600">
                          {resume.score.toFixed(2)}
                        </span>
                      </p>

                      <div className="mb-3 max-h-20 overflow-hidden text-sm text-gray-500">
                        {shortenSummary(resume.summary)}
                      </div>

                      <div
                        onClick={() => openPdf(resume.pdfUrl)}
                        className="cursor-pointer"
                      >
                        <iframe
                          src={`${resume.pdfUrl}#toolbar=0`}
                          className="w-full h-48 mt-2 rounded-lg border border-gray-300 hover:border-teal-600"
                        ></iframe>
                      </div>

                      <div className=" items-center mt-4">
                        <div className="flex justify-between ">
                          <a
                            href={`${resume.pdfUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button className="button-41" role="button">
                              View Pdf
                            </button>
                          </a>
                          <span className="text-sm text-gray-400">
                            {resume.filename}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="w-full bg-gray-100 p-5 flex items-center justify-center">
            <button className="button-91" role="button" onClick={()=> {scanMore()}}>
              Scan More +{" "}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
