import Cookies from "js-cookie";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  lastName: string;
  email: string;
  phone: string;
}

interface AuthResponse {
    user:{
        name: string;
        last_name: string;
        email: string;
        phone: string;
    }
    token: string;
    expiresIn: number;
}

interface AuthContextData {
  user: User | null;
  signIn: (data: AuthResponse) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const signIn = (data: AuthResponse) => {
    const { user, token, expiresIn } = data;
    console.log("User data:", user);
    setUser({
        name: user.name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
    });
    Cookies.set("token", token, {
      expires: new Date(Date.now() + expiresIn * 1000),
    });
    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };

  const signOut = () => {
    setUser(null);
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
