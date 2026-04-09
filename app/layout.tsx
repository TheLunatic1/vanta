// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/components/CartContext";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vanta | Premium Fashion",
  description: "VantaBlack for Men • VantaRozze for Women",
  
  icons: {
    icon: "https://i.imgur.com/EuhXZpP.png",
    apple: "https://i.imgur.com/EuhXZpP.png",
    shortcut: "https://i.imgur.com/EuhXZpP.png",
  },
  
  // Optional: Social sharing image (same logo or a bigger banner)
  openGraph: {
    images: ["https://i.imgur.com/EuhXZpP.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-base-100 text-base-content">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}