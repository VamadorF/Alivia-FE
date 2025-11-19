import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Alivia - Healthcare Platform",
  description: "Modern healthcare platform built with Next.js, React, TypeScript, and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider defaultTheme="system" storageKey="alivia-ui-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
