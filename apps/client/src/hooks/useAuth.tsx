import { AuthContext } from "@/context/auth";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth необхідно використовувати всередині AuthProvider");
  }
  return context;
};
