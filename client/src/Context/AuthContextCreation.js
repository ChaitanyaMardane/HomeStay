import { createContext, useContext } from "react";
// import { verifyUser } from "../services/authService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
