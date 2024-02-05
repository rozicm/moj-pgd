import React, { useEffect, useState } from "react";

interface IntervencijaDataRow {
  intervencija_id: number;
  datum: Date;
  tip: string;
  st_clanov: number;
  opis: string;
}

interface InputFormProps {
  onAdd: (newDataRow: IntervencijaDataRow) => void;
}

const InputIntervencija: React.FC<InputFormProps> = ({ onAdd }) => {
  const [intervencijaId, setIntervencijaId] = useState<number | null>(null);
  const [datum, setDatum] = useState<string>("");
  const [tip, setTip] = useState<string>("");
  const [stClanov, setStClanov] = useState<number | null>(null);
  const [opis, setOpis] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDataRow: IntervencijaDataRow = {
      intervencija_id: intervencijaId ?? 0,
      datum: new Date(datum),
      tip,
      st_clanov: stClanov ?? 0,
      opis,
    };
    onAdd(newDataRow);
    // Clear the form fields after adding the row
    setIntervencijaId(null);
    setDatum("");
    setTip("");
    setStClanov(null);
    setOpis("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="ID intervencije"
            value={intervencijaId ?? ""} // ensure value is not null
            onChange={(e) => {
              const parsedValue = parseInt(e.target.value);
              setIntervencijaId(isNaN(parsedValue) ? null : parsedValue);
            }}
          />
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
            placeholder="Tip"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
          />

          <input
            type="text"
            placeholder="Število članov"
            value={stClanov ?? ""} // ensure value is not null
            onChange={(e) => {
              const parsedValue = parseInt(e.target.value);
              setStClanov(isNaN(parsedValue) ? null : parsedValue);
            }}
          />
          <input
            type="text"
            placeholder="Opis"
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2"
          >
            Dodaj
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputIntervencija;
