"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <Provider store={store}>
      <AnimatePresence mode="wait" key={pathname}>
        {children}
      </AnimatePresence>
    </Provider>
  );
}
