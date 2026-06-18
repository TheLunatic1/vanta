import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vanta | Premium Fashion",
  description: "VantaBlack for Men • VantaRozze for Women",
  
  icons: {
    icon: "https://i.imgur.com/UpPXy3d.jpeg",
    apple: "https://i.imgur.com/UpPXy3d.jpeg",
    shortcut: "https://i.imgur.com/UpPXy3d.jpeg",
  },
  
  // Optional: Social sharing image (same logo or a bigger banner)
  openGraph: {
    images: ["https://i.imgur.com/UpPXy3d.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-base-100 text-base-content min-h-screen">
        {children}
      </body>
    </html>
  );
}