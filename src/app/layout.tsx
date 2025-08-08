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
  title: "My Channel Sabse Tej - Your Trusted News Source",
  description: "Stay updated with the latest breaking news, weather updates, and live coverage from My Channel Sabse Tej. Your trusted source for accurate and timely news reporting.",
  keywords: "news, breaking news, live updates, weather, sports, politics, entertainment",
  authors: [{ name: "My Channel Sabse Tej News Team" }],
  creator: "My Channel Sabse Tej",
  publisher: "My Channel Sabse Tej",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mychannelsabsetej.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'hi-IN': '/hi',
    },
  },
  openGraph: {
    title: "My Channel Sabse Tej - Your Trusted News Source",
    description: "Stay updated with the latest breaking news, weather updates, and live coverage from My Channel Sabse Tej.",
    url: 'https://mychannelsabsetej.com',
    siteName: 'My Channel Sabse Tej',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'My Channel Sabse Tej News',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "My Channel Sabse Tej - Your Trusted News Source",
    description: "Stay updated with the latest breaking news, weather updates, and live coverage from My Channel Sabse Tej.",
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
