"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

export default function Page() {
  const { signIn, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Stack height="100vh" direction="row">
      <Stack
        flex={1}
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Stack width="100%" maxWidth={400}>
          <Stack pb={6}>
            <Typography variant="h4" textAlign="center">
              Sign In
            </Typography>
          </Stack>

          <TextField
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
          />

          <Stack pt={6}>
            <LoadingButton
              fullWidth
              variant="contained"
              size="large"
              loading={isLoading}
              onClick={() => {
                signIn(email, password);
              }}
            >
              Sign In
            </LoadingButton>
          </Stack>
        </Stack>
      </Stack>

      <Stack flex={1} height="100vh" bgcolor="primary.main" />
    </Stack>
  );
}
