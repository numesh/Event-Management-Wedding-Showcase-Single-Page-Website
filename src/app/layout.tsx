import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asgard Events | Luxury Event Planning & Wedding Excellence",
  description: "Create Mythic Moments with Asgard Events. Luxury event planning at DoubleTree by Hilton Weerawila Rajawarna Resort.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${playfair.variable} antialiased bg-[#050505] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
