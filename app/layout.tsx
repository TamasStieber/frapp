import "@radix-ui/themes/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import { Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FrApp",
  description: "Simple issue-tracking app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme appearance="light" accentColor="grass" radius="none">
          <NavBar />
          <main>{children}</main>
        </Theme>
      </body>
    </html>
  );
}
