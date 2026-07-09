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

const protestRevolution = Cherish({
  weight: "400",
  variable: "--font-protest-revolution",
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
      className={`${fruktur.variable} ${josefinSans.variable} ${protestRevolution.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MainNav />
        {children}
      </body>
    </html>
  );
}
