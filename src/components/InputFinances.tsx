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
  lastIntervencijaId: number;
}

const InputIntervencija: React.FC<InputFormProps> = ({
  lastIntervencijaId,
  onAdd,
}) => {
  const [intervencijaId, setIntervencijaId] =
    useState<number>(lastIntervencijaId);
  const [datum, setDatum] = useState<string>("");
  const [tip, setTip] = useState<string>("");
  const [stClanov, setStClanov] = useState<number | null>(null);
  const [opis, setOpis] = useState<string>("");

  useEffect(() => {
    setIntervencijaId(lastIntervencijaId);
  }, [lastIntervencijaId]);

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
    setIntervencijaId(intervencijaId + 1);
    setDatum("");
    setTip("");
    setStClanov(null);
    setOpis("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-wrap">
        <div className="flex items-center mb-4">
          <label htmlFor="intervencijaId" className="mr-2">
            ID intervencije:
          </label>
          <input
            type="text"
            id="intervencijaId"
            value={intervencijaId ?? ""}
            onChange={(e) => {
              const parsedValue = parseInt(e.target.value);
              if (!isNaN(parsedValue)) {
                setStClanov(parsedValue);
              } else {
                setStClanov(null);
              }
            }}
            className="px-2 py-1 border rounded"
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="datum" className="mr-2">
            Datum:
          </label>
          <input
            type="date"
            id="datum"
            value={datum}
            onChange={(e) => setDatum(e.target.value)}
            className="px-2 py-1 border rounded"
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="tip" className="mr-2">
            Tip:
          </label>
          <input
            type="text"
            id="tip"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            className="px-2 py-1 border rounded"
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="stClanov" className="mr-2">
            Število članov:
          </label>
          <input
            type="text"
            id="stClanov"
            value={stClanov ?? ""}
            onChange={(e) => {
              const parsedValue = parseInt(e.target.value);
              setStClanov(isNaN(parsedValue) ? null : parsedValue);
            }}
            className="px-2 py-1 border rounded mr-2"
          />
          <label htmlFor="opis" className="mr-2">
            Opis:
          </label>
          <input
            type="text"
            id="opis"
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
            className="px-2 py-1 border rounded mr-2"
          />
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
