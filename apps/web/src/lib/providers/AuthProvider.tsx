import { ReactNode, createContext, useContext } from "react";

interface AuthContextType {
  userId: string | null | undefined;
  linkToken: string | null | undefined;
}

interface AuthProviderProps {
  children: ReactNode;
  userId: string | null | undefined;
  linkToken: string | null | undefined;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  return context as AuthContextType;
}

export default function AuthProvider({
  children,
  userId,
  linkToken,
}: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{ userId, linkToken }}>
      {children}
    </AuthContext.Provider>
  );
}
