import React, { useState } from "react";

interface DataRow {
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

interface InputFormProps {
  onAdd: (newDataRow: DataRow) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onAdd }) => {
  const [clanId, setClanId] = useState<number | null>(null);
  const [ime, setIme] = useState<string>("");
  const [priimek, setPriimek] = useState<string>("");
  const [datumRojstva, setDatumRojstva] = useState<string>("");
  const [specialnosti, setSpecialnosti] = useState<string>("");
  const [krajBivanja, setKrajBivanja] = useState<string>("");
  const [zdravniski, setZdravniski] = useState<string>("");
  const [funkcija, setFunkcija] = useState<string>("");
  const [cin, setCin] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDataRow: DataRow = {
      clan_id: clanId ?? 0,
      ime,
      priimek,
      datum_rojstva: new Date(datumRojstva),
      specialnosti,
      kraj_bivanja: krajBivanja,
      zdravniski: zdravniski ? new Date(zdravniski) : null,
      funkcija,
      cin,
    };
    onAdd(newDataRow);
    setClanId(null);
    setIme("");
    setPriimek("");
    setDatumRojstva("");
    setSpecialnosti("");
    setKrajBivanja("");
    setZdravniski("");
    setFunkcija("");
    setCin("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID člana"
          value={clanId ?? ""}
          onChange={(e) => {
            const parsedValue = parseInt(e.target.value);
            setClanId(isNaN(parsedValue) ? null : parsedValue);
          }}
        />
        <input
          type="text"
          placeholder="Ime"
          value={ime}
          onChange={(e) => setIme(e.target.value)}
        />
        <input
          type="text"
          placeholder="Priimek"
          value={priimek}
          onChange={(e) => setPriimek(e.target.value)}
        />

        <input
          type="text"
          placeholder="Datum rojstva"
          value={datumRojstva}
          onChange={(e) => setDatumRojstva(e.target.value)}
          onFocus={(e) => {
            if (datumRojstva !== "") {
              setDatumRojstva("");
            }
            e.target.type = "date";
          }}
        />
        <input
          type="text"
          placeholder="Specialnosti"
          value={specialnosti}
          onChange={(e) => setSpecialnosti(e.target.value)}
        />
        <input
          type="text"
          placeholder="Kraj bivanja"
          value={krajBivanja}
          onChange={(e) => setKrajBivanja(e.target.value)}
        />
        <input
          type="text"
          placeholder="Zdravniški"
          value={zdravniski}
          onChange={(e) => setZdravniski(e.target.value)}
          onFocus={(e) => {
            if (zdravniski !== "") {
              setZdravniski("");
            }
            e.target.type = "date";
          }}
        />
        <input
          type="text"
          placeholder="Funkcija"
          value={funkcija}
          onChange={(e) => setFunkcija(e.target.value)}
        />
        <input
          type="text"
          placeholder="Čin"
          value={cin}
          onChange={(e) => setCin(e.target.value)}
        />
        <button type="submit">Dodaj</button>
      </form>
    </div>
  );
};

export default InputForm;
