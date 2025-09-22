import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rate My | BYELYK",
  description: "Rate dorms, rank fits, crown winners. The University of Houston's premier dorm and fashion rating community.",
  keywords: ["University of Houston", "rate my", "fashion", "student housing", "UH", "BYELYK"],
  authors: [{ name: "BYELYK" }],
  openGraph: {
    title: "Rate My | BYELYK",
    description: "Rate dorms, rank fits, crown winners. The University of Houston's premier dorm and fashion rating community.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rate My | BYELYK",
    description: "Rate dorms, rank fits, crown winners. The University of Houston's premier dorm and fashion rating community.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
