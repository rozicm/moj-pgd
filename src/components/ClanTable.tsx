import React from "react";
import { api } from "~/utils/api";

const ClanTable: React.FC = () => {
  const { data, error, isLoading } = api.post.hello.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Extract unique clan_id values
  const uniqueClanIds = data.reduce((uniqueIds, item) => {
    if (!uniqueIds.includes(item.clan_id)) {
      uniqueIds.push(item.clan_id);
    }
    return uniqueIds;
  }, [] as string[]);

  return (
    <>
      <div className="custom-table-container ">
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
              // Find the first item with the matching clan_id
              const clanItem = data.find((item) => item.clan_id === clanId);
              if (!clanItem) return null; // Skip if no matching item found
              return (
                <tr key={clanId}>
                  <td>{clanItem.clan_id}</td>
                  <td>{clanItem.ime}</td>
                  <td>{clanItem.priimek}</td>
                  <td>{clanItem.datum_rojstva.toLocaleDateString()}</td>

                  <td>{clanItem.specialnosti ?? "/"}</td>
                  <td>{clanItem.kraj_bivanja ?? "/"}</td>
                  <td>
                    {clanItem.zdravniski
                      ? clanItem.zdravniski.toLocaleDateString()
                      : "/"}
                  </td>
                  <td>{clanItem.funkcija ?? "/"}</td>
                  <td>{clanItem.cin ?? "/"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClanTable;
