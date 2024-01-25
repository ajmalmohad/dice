"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { ClientSessionProvider } from "@/components/auth/client-session";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ClientSessionProvider>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </ClientSessionProvider>
  );
}
