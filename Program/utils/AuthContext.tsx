import { User } from "firebase/auth";
import { createContext, useContext } from "react";

export interface AuthContextType {
    user: User | undefined
    setUser: Function
}

export const AuthContext =  createContext<AuthContextType>({user: undefined, setUser: (u: User) => {}});

export const useAuth = () => useContext(AuthContext);