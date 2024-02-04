import React, { useEffect, useState } from "react";

interface VoznjaDataRow {
  voznja_id: number;
  datum: Date;
  zac_km: number;
  kon_km: number;
  namen: string;
  voznik: string;
}

interface InputFormProps {
  lastVoznjaId: number;
  lastKonKm: number;
  onAdd: (newDataRow: VoznjaDataRow) => void;
}

const InputVoznik: React.FC<InputFormProps> = ({
  lastVoznjaId,
  lastKonKm,
  onAdd,
}) => {
  console.log("lastVoznjaId:", lastVoznjaId);
  console.log("lastKonKm:", lastKonKm);
  const [voznjaId, setVoznjaId] = useState<number>(() => lastVoznjaId);
  const [datum, setDatum] = useState<string>("");
  const [zacKm, setZacKm] = useState<number>(lastKonKm);
  const [konKm, setKonKm] = useState<number | null>(null);
  const [namen, setNamen] = useState<string>("");
  const [voznik, setVoznik] = useState<string>("");

  useEffect(() => {
    setVoznjaId(lastVoznjaId);
    setZacKm(lastKonKm);
  }, [lastVoznjaId, lastKonKm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVoznjaDataRow: VoznjaDataRow = {
      voznja_id: voznjaId,
      datum: new Date(datum),
      zac_km: zacKm,
      kon_km: konKm ?? 0,
      namen,
      voznik,
    };
    onAdd(newVoznjaDataRow);
    // Increment voznjaId for the next entry
    setVoznjaId(voznjaId + 1);
    // Clear the form fields after adding the row
    setDatum("");
    setZacKm(0);
    setKonKm(0);
    setNamen("");
    setVoznik("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Voznja ID" value={voznjaId} readOnly />
        <input
          type="text"
          placeholder="Datum"
          value={datum}
          onChange={(e) => setDatum(e.target.value)}
          onFocus={(e) => {
            if (datum !== "") {
              setDatum(""); // Clear the value when focused if it's not already empty
            }
            e.target.type = "date"; // Change the input type to 'date' when focused
          }}
        />
        <input
          type="text"
          placeholder="Začetni kilometri"
          value={zacKm}
          readOnly
        />
        <input
          type="text"
          placeholder="Končni kilometri"
          value={konKm ?? ""}
          onChange={(e) => {
            const parsedValue = parseInt(e.target.value);
            setKonKm(isNaN(parsedValue) ? null : parsedValue);
          }}
        />
        <input
          type="text"
          placeholder="Namen"
          value={namen}
          onChange={(e) => setNamen(e.target.value)}
        />
        <input
          type="text"
          placeholder="Voznik"
          value={voznik}
          onChange={(e) => setVoznik(e.target.value)}
        />
        <button type="submit">Dodaj</button>
      </form>
    </div>
  );
};

export default InputVoznik;
