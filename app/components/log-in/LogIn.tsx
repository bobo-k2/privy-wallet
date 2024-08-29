"use client";

import { usePrivy, User } from "@privy-io/react-auth";
import { use, useEffect, useState } from "react";

export function LoginButton() {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);
  const { ready, authenticated, user, login, logout } = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  useEffect(() => {
    setAuthenticatedUser(user);
    console.log(user);
  }, [user]);

  return (
    <div>
      {!authenticated ? (
        <button disabled={disableLogin} onClick={login}>
          Log in
        </button>
      ) : (
        <button disabled={!disableLogin} onClick={logout}>
          Log out
        </button>
      )}
      {authenticatedUser && (
        <div>
          {authenticatedUser?.wallet?.address ??
            authenticatedUser?.email?.address}
        </div>
      )}
    </div>
  );
}
