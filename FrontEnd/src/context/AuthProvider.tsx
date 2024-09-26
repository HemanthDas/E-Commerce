import { createContext, PropsWithChildren, useState } from "react";
import { login } from "../api/authApi";

type AuthContext = {
  token?: string | null;
  currentUser?: {
    id: string;
    fullname: string;
    email: string;
  } | null;
  handleLogin: (
    email: string,
    password: string
  ) => Promise<{ token: string; userInfo: object }>;
  handleLogout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("token")?.toString() || null
  );
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    fullname: string;
    email: string;
  } | null>(
    localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser")!)
      : null
  );

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await login({ email, password });
      console.log(response);
      if (response.token) {
        setAuthToken(response.token);
        setCurrentUser(response.userInfo);
        localStorage.setItem("token", response.token);
        localStorage.setItem("currentUser", JSON.stringify(response.userInfo));
        return {
          token: response.token,
          userInfo: response.userInfo,
        };
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Login Failed: ${error.message}`);
      } else {
        throw new Error("Login Failed: An unknown error occurred");
      }
    }
    return {
      token: "",
      userInfo: {},
    };
  };

  const handleLogout = async () => {
    setAuthToken(null);
    setCurrentUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
  };
  return (
    <AuthContext.Provider
      value={{ token: authToken, currentUser, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
