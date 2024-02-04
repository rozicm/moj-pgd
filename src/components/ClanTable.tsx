import React from "react";
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
  const handleAddMember = async (newMemberData: NewMemberData) => {
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

  const uniqueClanIds = data.reduce((uniqueIds, item) => {
    if (!uniqueIds.includes(item.clan_id)) {
      uniqueIds.push(item.clan_id);
    }
    return uniqueIds;
  }, [] as number[]);

  return (
    <>
      <div
        className="custom-table-container mx-auto justify-center mb-10 "
        style={{ maxHeight: "450px" }}
      >
        <table className="custom-table">
          <thead>
            <tr>
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
      <div className="input-form-container mx-auto my-10">
        <InputForm onAdd={handleAddMember} />
      </div>
    </>
  );
};

export default ClanTable;
