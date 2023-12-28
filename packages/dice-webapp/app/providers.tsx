"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { ClientSessionProvider } from "@/components/auth/client-session";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ClientSessionProvider>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </NextUIProvider>
    </ClientSessionProvider>
  );
}
