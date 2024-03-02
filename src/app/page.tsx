"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [theme, setTheme] = useState<string>("System");

  const changeTheme = () => {
    const root = document.documentElement;
    const currentTheme = root.classList.contains("dark") ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    root.classList.remove(currentTheme);
    root.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme !== null) {
      setTheme(storedTheme || "System");
    }
  }, []);

  return (
    <main className="transition w-full min-h-80dvh bg-light dark:bg-dark px-4 lg2:px-0">
      <button onClick={changeTheme}>Change</button>
    </main>
  );
}
