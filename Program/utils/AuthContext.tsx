import { User } from "firebase/auth";
import { createContext, useContext } from "react";

export interface AuthContextType {
    user: User | undefined
    setUser: Function
}

// Context in React = props die je in de hele app wenst te gebruiken.
export const AuthContext =  createContext<AuthContextType>({user: undefined, setUser: (u: User) => {}});

// Make context available without JSX / TSX 
export const useAuth = () => useContext(AuthContext);