import React, { useEffect, useState } from "react";

interface FinanceDataRow {
  transaction_id: number;
  datum: Date;
  artikli: string;
  cena: number;
  kupec: string;
}

interface InputFormProps {
  lastTransactionId: number;
  onAdd: (newDataRow: FinanceDataRow) => void;
}

const InputFinance: React.FC<InputFormProps> = ({
  lastTransactionId,
  onAdd,
}) => {
  const [datum, setDatum] = useState<string>("");
  const [artikli, setArtikli] = useState<string>("");
  const [cena, setCena] = useState<string>("");
  const [kupec, setKupec] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDataRow: FinanceDataRow = {
      transaction_id: lastTransactionId,
      datum: new Date(datum),
      artikli: artikli,
      cena: parseFloat(cena), // Parse string input to float
      kupec: kupec,
    };
    onAdd(newDataRow);
    setDatum("");
    setArtikli("");
    setCena("");
    setKupec("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Transaction ID"
          value={lastTransactionId}
          readOnly
        />
        <input
          type="date"
          placeholder="Datum"
          value={datum}
          onChange={(e) => setDatum(e.target.value)}
        />
        <input
          type="text"
          placeholder="Artikli"
          value={artikli}
          onChange={(e) => setArtikli(e.target.value)}
        />
        <input
          type="text" // Change input type to text
          placeholder="Cena (€)"
          value={cena}
          onChange={(e) => setCena(e.target.value)}
        />
        <input
          type="text"
          placeholder="Kupec"
          value={kupec}
          onChange={(e) => setKupec(e.target.value)}
        />
        <button type="submit">Dodaj</button>
      </form>
    </div>
  );
};

export default InputFinance;
