import Head from "next/head";
import Navbar from "~/components/Navbar";
import Image from "next/image";
import GCGP from "~/assets/img/GCGP.png";
import { api } from "~/utils/api";

interface EquipmentItem {
  id: number;
  naziv_opreme: string;
  kolicina: number;
  status_opreme: boolean;
}

export default function Oprema() {
  const { data, error, isLoading, refetch } = api.post.get_oprema.useQuery();
  const update = api.post.update_oprema_status.useMutation();

  const handleStatusClick = async (
    oprema_id: number,
    status_opreme: boolean,
  ) => {
    const newStatus = !status_opreme; // Toggle the status
    try {
      await update.mutateAsync({ oprema_id, new_status: newStatus });
      await refetch();
    } catch (error) {
      console.error("Error updating status:", error);
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
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#111827] to-magenta">
        <div className="pr-24 pt-24">
          <Image
            src={GCGP}
            alt="Description of your image"
            width={800}
            height={600}
            className="cool-image"
          />
        </div>

        <div
          className="custom-table-container mr-12 mt-10"
          style={{ maxHeight: "550px" }}
        >
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
              {data.map((item: EquipmentItem) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.naziv_opreme}</td>
                  <td>{item.kolicina}</td>
                  <td
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleStatusClick(item.id, item.status_opreme)
                    }
                  >
                    <span
                      style={{
                        color: item.status_opreme
                          ? "rgba(0, 255, 0, 1)"
                          : "rgba(255, 0, 0, 1)",
                        fontSize: "24px",
                      }}
                    >
                      ●
                    </span>
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
