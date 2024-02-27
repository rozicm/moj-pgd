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
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="ID intervencije"
            value={intervencijaId ?? ""}
            onChange={(e) => {
              const parsedValue = parseInt(e.target.value);
              if (!isNaN(parsedValue)) {
                setStClanov(parsedValue);
              } else {
                setStClanov(null);
              }
            }}
          />
          <input
            type="text"
            placeholder="Datum"
            value={datum}
            onChange={(e) => setDatum(e.target.value)}
            onFocus={(e) => {
              if (datum !== "") {
                setDatum("");
              }
              e.target.type = "date";
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
            value={stClanov ?? ""}
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
          <input
            type="text"
            placeholder="Gasilci"
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
