import type { Metadata } from "next";
import {
  Cherish,
  Fruktur,
  Josefin_Sans,
  Josefin_Slab,
  Special_Elite,
} from "next/font/google";
import "./globals.css";
import MainNav from "@/components/navigation/main-nav";
import Footer from "@/components/footer";

const specialElite = Special_Elite({
  variable: "--font-special-elite",
  subsets: ["latin"],
  weight: "400",
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

const josefinSlab = Josefin_Slab({
  variable: "--font-josefin-slab",
  subsets: ["latin"],
});

const fruktur = Fruktur({
  variable: "--font-fruktur",
  subsets: ["latin"],
  weight: "400",
});

const cherish = Cherish({
  variable: "--font-cherish",
  subsets: ["latin"],
  weight: "400",
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
      className={`${specialElite.variable} ${fruktur.variable} ${josefinSlab.variable} ${josefinSans.variable} ${cherish.variable} h-full antialiased`}
    >
      <body className="flex flex-col">
        <a
          href="#main"
          className="absolute inset-bs-[calc(-1000px)] focus-visible:inset-bs-0 | inline-full py-4 text-center bg-pink-700 text-white font-display text-fluid-xl"
        >
          Skip to content
        </a>
        <MainNav />
        <main id="main" className="min-block-svh">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
