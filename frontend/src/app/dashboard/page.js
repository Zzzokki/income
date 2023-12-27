"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { Container, Stack, Typography } from "@mui/material";
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
    <Stack height="100vh" bgcolor="#f3f4f6">
      <Stack height={64} bgcolor="#fff">
        <Container></Container>
      </Stack>

      <Container>
        <Stack direction="flex">
          <Stack width={300}>
            <Card variant="outlined"></Card>
          </Stack>
          <Stack flex={1}></Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
