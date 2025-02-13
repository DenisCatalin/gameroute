import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import SnackbarWrapper from "./components/SnackbarWrapper";
import Header from "./components/Header/Header";
import GalleryWrapper from "./components/GalleryWrapper";
import { Poppins } from "@next/font/google";

const kanit = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "GameRoute - Homepage",
  description: "Generated by create next app",
  icons: {
    icon: [
      {
        url: "/static/favicon.png",
        href: "/static/favicon.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`select-none relative transition-all bg-light dark:bg-dark min-h-dvh w-full flex flex-col lg2:px-24 lg2:py-4 ${kanit.className}`}
      >
        <link rel="icon" href="/static/favicon.png" sizes="any" />
        <Providers>
          <main>
            <Header />
            <SnackbarWrapper />
            <GalleryWrapper />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
