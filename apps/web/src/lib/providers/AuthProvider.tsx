import { ReactNode, createContext, useContext } from "react";

interface AuthContextType {
  userId: string | null | undefined;
}

interface AuthProviderProps {
  children: ReactNode;
  userId: string | null | undefined;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children, userId }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{ userId }}>{children}</AuthContext.Provider>
  );
}
