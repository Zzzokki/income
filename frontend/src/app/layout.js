"use client";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "@/components/providers/AuthProvider";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
