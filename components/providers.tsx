"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { useUserInfo } from "@/features/user/hooks/useUserInfo";
type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  // Just create QueryClient once
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <UserInfoHydrator />
      {children}
      <ToastContainer />
    </QueryClientProvider>
  );
}

function UserInfoHydrator() {
  useUserInfo();
  return null;
}
