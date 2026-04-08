import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Vanta | Premium Fashion",
  description: "VantaBlack for Men • VantaRozze for Women",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-base-100 text-base-content">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}