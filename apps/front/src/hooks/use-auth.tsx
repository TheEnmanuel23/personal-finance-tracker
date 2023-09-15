import React, { createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface User {
  id?: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  data: { jwt: string; user: User } | null;
  signin: (user: User) => void;
  signup: (user: User) => void;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

const fetcher = async (url: string, user: User) => {
  return await fetch(`http://localhost:8000/auth/${url}`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 401 || res.status === 409) {
        throw new Error(res.status.toString());
      }
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("userData", JSON.stringify(data));
      return data;
    });
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState(() => {
    const userData = localStorage.getItem("userData") || null;
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  });

  const signin = async (user: User) => {
    return await fetcher("signin", user).then((data) => setData(data));
  };

  const signup = async (user: User) => {
    return await fetcher("signup", user).then((data) => setData(data));
  };

  const signout = () => {
    localStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider value={{ data, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.data?.user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};
