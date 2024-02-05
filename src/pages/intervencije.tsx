import Head from "next/head";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";
import React, { useState, useEffect } from "react";
import InputIntervencija from "~/components/InputIntervencija";
import { signIn, useSession } from "next-auth/react";

interface IntervencijaDataRow {
  intervencija_id: number;
  datum: Date;
  tip: string;
  st_clanov: number;
  opis: string;
}

export default function Intervencije() {
  const { data, error, isLoading, refetch } = api.post.get_intervencija.useQuery();
  const createNew = api.post.add_intervencija.useMutation();
  const [lastIntervencijaId, setLastIntervencijaId] = useState<number>(0);
  const { data: sessionData } = useSession();

  React.useEffect(() => {
    if (!sessionData) {
      window.location.href = "/";
    }
  }, [sessionData]);

  useEffect(() => {
    if (data && data.length > 0) {
      const lastData = data[data.length - 1];
      if (lastData) {
        setLastIntervencijaId(lastData.intervencija_id + 1);
        console.log("Last intervencija_id:", lastData.intervencija_id + 1);
        console.error("Error: lastData is undefined");
      }
    }
  }, [data]);

  if (!sessionData) {
    return null;
  }
  const handleAddMember = async (newMemberData: IntervencijaDataRow) => {
    try {
      await createNew.mutateAsync(newMemberData);
      await refetch();
      console.log(newMemberData);
      console.log("New member added:");
    } catch (error) {
      console.error("Error adding new member:");
    }
  };
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
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#111827] to-magenta">
        <div
          className="custom-table-container mb-6 mt-16 "
          style={{ maxHeight: "365px" }}
        >
          <table className="custom-table">
            <thead>
              <tr>
                <th>Intervencija ID</th>
                <th>Datum</th>
                <th>Tip</th>
                <th>Število članov</th>
                <th>Opis</th>
              </tr>
            </thead>
            <tbody>
              {data.map((intervencija) => (
                <tr key={intervencija.intervencija_id}>
                  <td>{intervencija.intervencija_id}</td>
                  <td>{intervencija.datum.toLocaleDateString()}</td>
                  <td>{intervencija.tip}</td>
                  <td>{intervencija.st_clanov}</td>
                  <td>{intervencija.opis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="input-form-container mx-auto my-10 flex flex-col items-center">
          <InputIntervencija
            lastIntervencijaId={lastIntervencijaId}
            onAdd={handleAddMember}
          />
        </div>
      </main>
    </>
  );
}
