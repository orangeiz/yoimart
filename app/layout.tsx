import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YoiMart",
  description: "Burn your passion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
    <html lang="en">
        <body className={font.className}>{children}</body>
      </html>
    </SessionProvider>
  
  );
}
