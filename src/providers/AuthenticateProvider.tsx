import React, { useContext, useState } from "react";

const AuthenticateContext = React.createContext<undefined | string>(undefined);
const UpdateAuthenticateContext = React.createContext(undefined as any);

export function useAuthentication() {
  return useContext(AuthenticateContext);
}

export function useUpdateAuthentication() {
  return useContext(UpdateAuthenticateContext);
}

export function AuthenticateProvider({ children }: { children: any }) {
  const [authenticateContext, setAuthenticateContext] = useState(undefined);

  return (
    <AuthenticateContext.Provider value={authenticateContext}>
      <UpdateAuthenticateContext.Provider value={setAuthenticateContext}>
        {children}
      </UpdateAuthenticateContext.Provider>
    </AuthenticateContext.Provider>
  );
}
