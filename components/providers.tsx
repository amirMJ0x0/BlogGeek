"use client";

import { useUserInfo } from "@/features/user/hooks/useUserInfo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./theme-provider";
type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  // Just create QueryClient once
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <UserInfoHydrator />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
}

function UserInfoHydrator() {
  useUserInfo();
  return null;
}
