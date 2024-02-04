import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex items-center justify-center pr-2 text-xl">
      <p className="color-white text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className={`transform rounded-full px-8 py-2 font-semibold no-underline transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 ${
          sessionData
            ? "bg-red-600"
            : "from-red-600 to-red-900 bg-gradient-to-tr"
        }`}
        style={{
          color: "white",
          background: "linear-gradient(45deg, #ff3d00, #ff1744)",
        }}
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Odjava" : "Prijava"}
      </button>
    </div>
  );
};

export default AuthShowcase;
