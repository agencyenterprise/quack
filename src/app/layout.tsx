import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "@typeform/embed/build/css/popup.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

const title = "Quack Advice";
const description = "Steel-manning your ideas with quack advice.";

export const metadata: Metadata = {
  title,
  description,
  icons: [
    {
      url: "/favicon.ico",
      rel: "icon",
      sizes: "any",
    },
  ],
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: "https://www.quackadvice.com/logo.png",
  },
  openGraph: {
    type: "website",
    url: "https://www.quackadvice.com",
    title,
    description,
    images: "https://www.quackadvice.com/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Script
          src="https://scripts.simpleanalyticscdn.com/latest.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
