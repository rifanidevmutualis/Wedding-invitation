import type { Metadata } from "next";
import { Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: "Edward & Bella | Wedding Invitation",
  description: "Undangan pernikahan digital Edward dan Bella.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${playfair.variable} ${greatVibes.variable} antialiased bg-stone-200 text-stone-900 font-[family-name:var(--font-playfair)]`}>
        {children}
      </body>
    </html>
  );
}
