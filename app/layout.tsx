import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import NavbarAvatar from "@/components/helper/navbar-avatar";
import {NextUIProvider} from "@nextui-org/system";
import ModalProvider from "@/components/providers/ModalProvider";
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
            <body className={font.className}>
              <ModalProvider/>
              <NavbarAvatar/>
              <main>{children}</main>
            </body>
          </html>
      </SessionProvider>
    

  );
}
