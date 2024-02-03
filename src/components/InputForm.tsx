// InputForm.tsx
import React, { useState } from "react";

interface DataRow {
  clan_id: string;
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
  const [clanId, setClanId] = useState<string>("");
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
      clan_id: clanId,
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
    // Clear the form fields after adding the row
    setClanId("");
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
    <div className="input-form-container">
      <h2>Dodajanje novega člana</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Clan ID"
          value={clanId}
          onChange={(e) => setClanId(e.target.value)}
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
          placeholder="Datum rojstva (YYYY-MM-DD)"
          value={datumRojstva}
          onChange={(e) => setDatumRojstva(e.target.value)}
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
        />
        <input
          type="text"
          placeholder="Funkcija"
          value={funkcija}
          onChange={(e) => setFunkcija(e.target.value)}
        />
        <input
          type="text"
          placeholder="CIN"
          value={cin}
          onChange={(e) => setCin(e.target.value)}
        />
        <button type="submit">Dodaj</button>
      </form>
    </div>
  );
};

export default InputForm;
