"use client";

import { api } from "@/common";
import { Backdrop, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const signIn = async (email, password) => {
    setIsLoading(true);

    try {
      const { data } = await api.post("/sign-in", {
        email,
        password,
      });

      const { token } = data;

      localStorage.setItem("token", token);

      setIsLoggedIn(true);

      router.push("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email, password) => {
    setIsLoading(true);

    try {
      const { data } = await api.post("/sign-up", {
        email,
        password,
      });

      const { token } = data;

      localStorage.setItem("token", token);

      setIsLoggedIn(true);

      router.push("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);

    router.push("/sign-in");
  };

  useEffect(() => {
    setIsReady(false);

    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }

    setIsReady(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        isLoggedIn,
        isLoading,
      }}
    >
      {isReady && children}

      <Backdrop
        open={!isReady}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
