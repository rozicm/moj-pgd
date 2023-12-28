import React, { useState } from "react";

const VegovaSiFrame: React.FC = () => {
  const [url] = useState("https://www.vegova.si");

  return (
    <div className="okvir">
      <iframe
        title="Vegova.si"
        src={url}
        width="100%"
        height="600px"
        className="rounded-lg"
      />
    </div>
  );
};

export default VegovaSiFrame;
