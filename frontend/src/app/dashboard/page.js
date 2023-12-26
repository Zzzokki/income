"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) router.push("/sign-in");
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  return (
    <Stack height="100vh" justifyContent="center" alignItems="center">
      <Typography variant="h5">This is a Dashboard page</Typography>
    </Stack>
  );
}
