import type { Metadata } from "next";
import { Cherish, Fruktur, Josefin_Sans } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/navigation/main-nav";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

const fruktur = Fruktur({
  weight: "400",
  variable: "--font-fruktur",
  subsets: ["latin"],
});

const cherish = Cherish({
  weight: "400",
  variable: "--font-cherish",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JosifiniX",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fruktur.variable} ${josefinSans.variable} ${cherish.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="absolute inset-bs-[calc(-1000px)] focus-visible:inset-bs-0 | inline-full py-4 text-center bg-pink-700 text-white font-display text-fluid-xl"
        >
          Skip to content
        </a>
        <MainNav />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
