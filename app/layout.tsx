import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
