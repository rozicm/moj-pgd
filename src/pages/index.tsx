// Home.jsx

import React from "react";
import Head from "next/head";
import Navbar from "~/components/Navbar";
import Okvir from "~/components/Okvir";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-[#111827] to-magenta">
        <Head>
          <title>MojPGD</title>
          <meta name="description" content="Generated by create-t3-app" />
          <link rel="icon" href="/logo.png" />
        </Head>
        <div className="flex flex-col items-center justify-center">
          <div className="animate-float mb-32">
            <Image src="/logo.png" alt="Logo" width={350} height={350} />
          </div>
          <button
            onClick={() => signIn()}
            className="to-red-700 hover:bg-red-700 text-white focus:ring-red-500 mt-16 transform rounded-full bg-gradient-to-b from-magenta px-16 py-6 text-2xl font-bold shadow-2xl transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              color: "white",
              boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.6)",
            }}
          >
            Prijava
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>MojPGD</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main className="flex flex-col items-center justify-center bg-gradient-to-b from-[#111827] to-magenta pt-24">
        <div className="navbar z-50">
          <Navbar />
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <div className="mt-16 grid grid-cols-3 gap-8 overflow-y-scroll px-8 pb-8">
            <Okvir />
            <Okvir />
            <Okvir />
            <Okvir />
            <Okvir />
            <Okvir />
          </div>
        </div>
      </main>
    </>
  );
}
