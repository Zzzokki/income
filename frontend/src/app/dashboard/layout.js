"use client";

import { Header } from "@/components/Header";
import { useAuth } from "@/components/providers/AuthProvider";
import { Container, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const router = useRouter();

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) router.push("/sign-in");
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  return (
    <Stack minHeight="100vh" bgcolor="#f3f4f6">
      <Header />
      <Container>{children}</Container>
    </Stack>
  );
};

export default Layout;
