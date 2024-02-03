import React from "react";
import Head from "next/head";
import Navbar from "~/components/Navbar";
import Image from "next/image";
import GCGP from "~/assets/img/GCGP.png";
import { api } from "~/utils/api";

export default function Oprema() {
  const { data, error, isLoading } = api.post.get_oprema.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#111827] to-magenta">
        <div className="pr-24 pt-24">
          <Image
            src={GCGP}
            alt="Description of your image"
            width={800}
            height={600}
          />
        </div>

        <div className="custom-table-container mr-12 mt-10" style={{ maxHeight: "550px" }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Oprema ID</th>
                <th>Ime opreme</th>
                <th>Količina</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.naziv_opreme}</td>
                  <td>{item.kolicina}</td>
                  <td>
                    {item.status_opreme ? (
                      <span
                        style={{
                          color: "rgba(0, 255, 0, 1)",
                          fontSize: "24px",
                        }}
                      >
                        ●
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "rgba(255, 0, 0, 1)",
                          fontSize: "24px",
                        }}
                      >
                        ●
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}