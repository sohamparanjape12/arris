import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import LocomotiveScrollProvider from "@/components/LocomotiveScrollProvider";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/PreLoader";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "arris",
  description: "Architectural practice based in Pune and Goa. Focusing on residential, cultural, and spatial projects.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${monaSans.variable} antialiased overflow-x-hidden loading`}
    >
      <body className="overflow-x-hidden loading">
        <Preloader />
        <LocomotiveScrollProvider>
          <Navbar />
          {children}
        </LocomotiveScrollProvider>
      </body>
    </html>
  );
}
