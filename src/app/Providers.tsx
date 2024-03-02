"use client";

import { ThemeProvider } from "next-themes";
import React, { useState } from "react";
import { ReduxProvider } from "./redux/Provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default Providers;
