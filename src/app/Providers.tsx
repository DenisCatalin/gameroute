"use client";

import { ThemeProvider } from "next-themes";
import React, { useState } from "react";
import { ReduxProvider } from "./redux/Provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "./_trpc/client";

export function Providers({ children }: { children: React.ReactNode }) {
  const appUrl =
    process.env.NODE_ENV === "production"
      ? process.env.PROD_APP_URL || "https://blackwater-nu.vercel.app/api/trpc"
      : process.env.DEV_APP_URL || "http://localhost:3000/api/trpc";
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: appUrl,
        }),
      ],
    })
  );
  return (
    <ReduxProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default Providers;
