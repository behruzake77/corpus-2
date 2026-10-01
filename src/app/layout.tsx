import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
  display: "swap",
});

const ibm = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Corpus — Interactive Human Anatomy",
    template: "%s · Corpus",
  },
  description:
    "Corpus is a premium anatomy studio for medical students. Explore structures, practice with retrieval, and connect every region to clinic.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${sourceSans.variable} ${ibm.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
