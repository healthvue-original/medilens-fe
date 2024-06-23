import LeftNav from "@/components/LeftNav";
import APIProvider from "@/context/APIProvider";
import { DialogProvider } from "@/context/DialogProvider";
import { Theme, ThemeProvider } from "@/context/ThemeProvider";
import type { Metadata } from "next";
import "./globals.css";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import Header from "@/components/Header/Header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "HealthVue",
  description: "Your Pathology Expert",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const colorScheme = (cookieStore.get("color-scheme")?.value ??
    "dark") as Theme;
  return (
    <html lang="en" className={colorScheme}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider colorScheme={colorScheme}>
          <APIProvider>
            <DialogProvider>
              <section className="flex h-full flex-col">
                <header className="h-14 border-b">
                  <Header />
                </header>
                <section className="flex flex-1 overflow-hidden">
                  <aside className="hidden sm:flex w-[72px]">
                    <LeftNav />
                  </aside>
                  <main className="flex-1 overflow-scroll">{children}</main>
                </section>
              </section>
            </DialogProvider>
          </APIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
