import {
  createContext,
  useState,
  useEffect,
  type FC,
  type PropsWithChildren,
} from "react";
import { client } from "../apollo-client";

interface AuthContextType {
  username: string | null;
  login: (name: string) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("username");
      if (savedUser) {
        setUsername(savedUser);
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
  }, []);

  function login(name: string) {
    if (!name.trim()) {
      return;
    }
    setUsername(name);
    try {
      localStorage.setItem("username", name);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  async function logout() {
    setUsername(null);
    try {
      localStorage.removeItem("username");
      await client.clearStore(); // Clear Apollo cache
    } catch (error) {
      console.error("Error on logout:", error);
    }
  }

  const value = { username, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
