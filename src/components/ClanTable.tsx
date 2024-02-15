import React, { useState } from "react";
import { api } from "~/utils/api";
import InputForm from "./InputForm";

const ClanTable: React.FC = () => {
  interface NewMemberData {
    clan_id: number;
    ime: string;
    priimek: string;
    datum_rojstva: Date;
    specialnosti: string;
    kraj_bivanja: string;
    zdravniski: Date | null;
    funkcija: string;
    cin: string;
  }

  const { data, error, isLoading, refetch } = api.post.hello.useQuery();
  const createNew = api.post.create.useMutation();
  const deleteRows = api.post.delete_clan.useMutation();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleAddMember = async (newMemberData: NewMemberData) => {
    try {
      await createNew.mutateAsync(newMemberData);
      await refetch();
      console.log("New member added:", newMemberData);
    } catch (error) {
      console.error("Error adding new member:", error);
    }
  };

  const handleCheckboxChange = (clanId: number) => {
    if (selectedRows.includes(clanId)) {
      setSelectedRows(selectedRows.filter((id) => id !== clanId));
    } else {
      setSelectedRows([...selectedRows, clanId]);
    }
  };

  const handleDeleteSelectedRows = async () => {
    try {
      await deleteRows.mutateAsync(selectedRows);
      await refetch();
      setSelectedRows([]);
      console.log("Selected rows deleted successfully");
    } catch (error) {
      console.error("Error deleting selected rows:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const uniqueClanIds = data.reduce((uniqueIds, item) => {
    if (!uniqueIds.includes(item.clan_id)) {
      uniqueIds.push(item.clan_id);
    }
    return uniqueIds;
  }, [] as number[]);

  return (
    <>
      <div
        className="custom-table-container mx-auto mb-6 justify-center "
        style={{ maxHeight: "450px" }}
      >
        <table className="custom-table">
          <thead>
            <tr>
              <th></th>
              <th>ID Člana</th>
              <th>Ime</th>
              <th>Priimek</th>
              <th>Datum Rojstva</th>
              <th>Specialnosti</th>
              <th>Kraj Bivanja</th>
              <th>Zdravniški</th>
              <th>Funkcija</th>
              <th>Čin</th>
            </tr>
          </thead>
          <tbody>
            {uniqueClanIds.map((clanId) => {
              const clanItem = data.find((item) => item.clan_id === clanId);
              if (!clanItem) return null;
              return (
                <tr key={clanId}>
                  <td>
                    <div className="checkbox-wrapper-31">
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(clanItem.clan_id)}
                        checked={selectedRows.includes(clanItem.clan_id)}
                      />
                      <svg viewBox="0 0 35.6 35.6">
                        <circle
                          className="background"
                          cx="17.8"
                          cy="17.8"
                          r="9.8"
                        ></circle>
                        <circle
                          className="stroke"
                          cx="17.8"
                          cy="17.8"
                          r="11.37"
                        ></circle>
                        <polyline
                          className="check"
                          points="11.78 18.12 15.55 22.23 25.17 12.87"
                        ></polyline>
                      </svg>
                    </div>
                  </td>
                  <td>{clanItem.clan_id}</td>
                  <td>{clanItem.ime}</td>
                  <td>{clanItem.priimek}</td>
                  <td>{clanItem.datum_rojstva.toLocaleDateString()}</td>
                  <td>{clanItem.specialnosti || "/"}</td>
                  <td>{clanItem.kraj_bivanja ?? "/"}</td>
                  <td>
                    {clanItem.zdravniski
                      ? clanItem.zdravniski.toLocaleDateString()
                      : "/"}
                  </td>
                  <td>{clanItem.funkcija || "/"}</td>
                  <td>{clanItem.cin ?? "/"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        <div
          className="transform rounded-md px-9 py-3 no-underline transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
          style={{
            color: "white",
            background: "linear-gradient(45deg, #ff3d00, #ff1744)",
          }}
        >
          <button onClick={handleDeleteSelectedRows}>
            Izbriši izbrani zapis
          </button>
        </div>
      </div>
      <div className="input-form-container mx-auto my-10">
        <InputForm onAdd={handleAddMember} />
      </div>
    </>
  );
};

export default ClanTable;
