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
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="bg-magenta transform rounded-full bg-white/10 px-14 py-2 font-semibold text-white no-underline transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-red-600 hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Odjava" : "Prijava"}
      </button>
    </div>
  );
};

export default AuthShowcase;
