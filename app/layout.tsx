import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Layout/Navbar";
import { Footer } from "./components/Layout/Footer";

// Load fonts outside component to prevent re-initialization on re-renders
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Azushop",
  description: "Your one-stop shop for all things tech",
  keywords: "tech, gadgets, electronics, online store",
  authors: [{ name: "Caleb Makafui Senyah" }],
  creator: "Caleb Makafui Senyah",
  openGraph: {
    title: "Azushop",
    description: "Your one-stop shop for all things tech",
    url: "https://azushop.com",
    siteName: "Azushop",
    images: [
      {
        url: "https://azushop.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Azushop - Your one-stop shop for all things tech",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${lato.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}