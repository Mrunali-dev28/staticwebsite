import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aaj Tak - Your Trusted News Source",
  description: "Stay updated with the latest breaking news, weather updates, and live coverage from Aaj Tak. Your trusted source for accurate and timely news reporting.",
  keywords: "news, breaking news, live updates, weather, sports, politics, entertainment",
  authors: [{ name: "Aaj Tak News Team" }],
  creator: "Aaj Tak",
  publisher: "Aaj Tak",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aajtak.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'hi-IN': '/hi',
    },
  },
  openGraph: {
    title: "Aaj Tak - Your Trusted News Source",
    description: "Stay updated with the latest breaking news, weather updates, and live coverage from Aaj Tak.",
    url: 'https://aajtak.com',
    siteName: 'Aaj Tak',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aaj Tak News',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Aaj Tak - Your Trusted News Source",
    description: "Stay updated with the latest breaking news, weather updates, and live coverage from Aaj Tak.",
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        {children}
      </body>
    </html>
  );
}
