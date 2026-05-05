import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Royal Gazioğlu | Lüks Dağ Oteli & Yüzen Spa',
    template: '%s | Royal Gazioğlu'
  },
  description: 'Royal Gazioğlu - Tunceli Halvori Köyü\'nde modern taş mimari, yüzen spa, yüzme havuzu ve doğa ile bütünleşmiş lüks otel. Wellness, spa ve benzersiz doğa deneyimleri.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
