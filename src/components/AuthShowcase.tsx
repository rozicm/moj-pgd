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
    <div className="flex items-center justify-center pr-2 text-3xl">
      <p className="text-white text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="bg-white/10 text-white hover:bg-red-600 hover:bg-white/20 transform rounded-full bg-magenta px-14 py-2 font-semibold no-underline transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Odjava" : "Prijava"}
      </button>
    </div>
  );
};

export default AuthShowcase;
