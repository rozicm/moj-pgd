import React from "react";
import Head from "next/head";
import Navbar from "~/components/Navbar";
import { useSession } from "next-auth/react";


export default function Finance() {
  const { data: sessionData } = useSession();

  React.useEffect(() => {
    if (!sessionData) {
      window.location.href = "/";
    }
  }, [sessionData]);

  if (!sessionData) {
    return null;
  }
  return (
    <>
      <Head>
        <title>MojPGD</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="navbar">
          <Navbar />
        </div>
      </div>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#111827] to-magenta"></main>
    </>
  );
}
