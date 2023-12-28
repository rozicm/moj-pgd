// import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Head from "next/head";
// import Link from "next/link";
// import { api } from "~/utils/api";
import Navbar from "~/components/Navbar";
import Okvir from "~/components/Okvir";

export default function Home() {
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>MojPGD</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#111827] to-magenta">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="navbar">
            <Navbar />
          </div>
          <div className="okvir-container grid grid-cols-3 gap-8 p-8">
            <Okvir/>
            <Okvir/>
            <Okvir/>
            <Okvir/>
            <Okvir/>
            <Okvir/>
          </div>
        </div>
      </main>
    </>
  );
}
