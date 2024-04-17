import React, { useState } from "react";
import Head from "next/head";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";

export default function LetnoPorocilo() {
  const [startDate, setStartDate] = useState(
    new Date("2020-01-01").toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const { data: reportData } = api.post.getYearlyReport.useQuery({
    startDate: new Date(startDate ?? "2020-01-01"),
    endDate: new Date(endDate ?? new Date()),
  });

  return (
    <>
      <Head>
        <title style={{ color: "white" }}>MojPGD - Letno Poročilo</title>
        <meta name="description" content="Poročilo o aktivnostih PGD" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="navbar">
          <Navbar />
        </div>
      </div>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#111827] to-magenta p-8">
        <div
          className="border-gray-800 bg-blue-500 mb-8 mt-20 rounded-lg border p-4 text-center shadow-lg animated fadeIn card"
          style={{ background: "linear-gradient(45deg, #ff3d00, #ff1744)" }}
        >
          <h1 className="mb-6 text-4xl font-bold" style={{ color: "white" }}>
            Izberite Datume
          </h1>
          <div className="flex items-center justify-center space-x-4">
            <div className="border-gray-800 rounded border p-3 shadow-md animated fadeInLeft">
              <label
                className="text-white mb-2 block text-lg"
                style={{ color: "white" }}
              >
                Začetni Datum:
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border-gray-300 bg-white focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full rounded-md border px-4 py-3 focus:outline-none sm:text-lg"
              />
            </div>
            <div className="border-gray-800 rounded border p-3 shadow-md animated fadeInRight">
              <label
                className="text-white mb-2 block text-lg"
                style={{ color: "white" }}
              >
                Končni Datum:
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border-gray-300 bg-white focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full rounded-md border px-4 py-3 focus:outline-none sm:text-lg"
              />
            </div>
          </div>
        </div>
        <div
          className="mb-8 rounded-lg p-4 text-center shadow-lg animated fadeIn"
          style={{ background: "linear-gradient(45deg, #ff3d00, #ff1744)" }}
        >
          {reportData && (
            <div className="text-center">
              <h1
                className="mb-8 text-4xl font-bold pt-2"
                style={{ color: "white" }}
              >
                Podatki
              </h1>
              <div className="bg-blue-500 border-black mb-6 rounded border px-10 py-2">
                <p className="text-xl pb-2" style={{ color: "white" }}>
                  Število članov:{" "}
                  <span className="font-bold">{reportData.člani}</span>
                </p>
                <p className="text-xl pb-2" style={{ color: "white" }}>
                  Število mentorjev:{" "}
                  <span className="font-bold">{reportData.mentorji}</span>
                </p>
                <p className="text-xl pb-2" style={{ color: "white" }}>
                  Število veljavnih zdravniških spričeval:{" "}
                  <span className="font-bold">
                    {reportData.zdravniskiCount}
                  </span>
                </p>
                <p className="text-xl pb-2" style={{ color: "white" }}>
                  Skupno število voženj:{" "}
                  <span className="font-bold">{reportData.voznje}</span>
                </p>
                <p className="text-xl pb-2" style={{ color: "white" }}>
                  Skupno število posredovanj:{" "}
                  <span className="font-bold">{reportData.intervencije}</span>
                </p>
                <p className="text-xl" style={{ color: "white" }}>
                  Skupni stroški:{" "}
                  <span className="font-bold">{reportData.stroški} €</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
