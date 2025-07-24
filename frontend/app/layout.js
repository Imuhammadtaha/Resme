import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/components/ReduxWrap";
import { HeroUIProvider } from "@heroui/react";

// Replacing Geist with Inter
const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Replacing Geist_Mono with Roboto Mono
const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RESME-SCAN",
  description: "A place for HRs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, user-scalable=no" />

      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <HeroUIProvider>
          <ReduxProvider>
            <Toaster position="top-right" />
            <Navbar />
            {children}
            <Footer />
          </ReduxProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
