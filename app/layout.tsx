import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import { Instrument_Serif } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider";
import FractalTree from "@/components/ui/fractal-tree";
import { Toaster } from "sonner";


const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"], // 🛠 Fix missing subsets
});

const description =
  "Adarsh Patil is a B.Tech CSE (AI & ML) student from Kolhapur who builds web projects end-to-end and contributes to open source.";

export const metadata: Metadata = {
  metadataBase: new URL("https://adarshpatil.tech"),
  title: { default: "Adarsh Patil | Developer Portfolio", template: "%s | Adarsh Patil" },
  description,
  authors: [{ name: "Adarsh Patil", url: "https://adarshpatil.tech" }],
  openGraph: {
    title: "Adarsh Patil | Developer Portfolio",
    description,
    url: "https://adarshpatil.tech/",
    siteName: "Adarsh Patil",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Adarsh Patil | Developer Portfolio",
    description,
  },
};

export default function RootLayout({
  children,
}: { 
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>{/* 🛠 Important for dark mode */}
      <body
        className={`${instrumentSerif.className} antialiased bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300 [--pattern-fg:var(--color-neutral-200)]`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Analytics />
          <SpeedInsights />
          <FractalTree />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
