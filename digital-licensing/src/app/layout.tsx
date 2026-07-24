import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GlobalProvider } from "../context/GlobalContext";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DESENIO Licensing | Premium Digital Asset Licensing Platform",
  description: "Discover, buy, and sell high-end digital asset licensing with AI-powered search and blockchain copyright verification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-[#080B14] text-[#F9FAFB]">
        <GlobalProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </GlobalProvider>
      </body>
    </html>
  );
}
