import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LyticsTracker from "../components/LyticsTracker";
import LyticsPathforaWrapper from "../components/LyticsPathforaWrapper";

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
  // Get Lytics configuration from environment variables
  const lyticsTagId = process.env.NEXT_PUBLIC_LYTICS_TAG_ID || 'd47835afc82093e811b7b2e88bf93d68';
  const lyticsSrc = `https://c.lytics.io/api/tag/${lyticsTagId}/latest.min.js`;

  return (
    <html lang="en">
      <head>
        {/* Lytics Tracking Tag Version 3 */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              !function(){"use strict";var o=window.jstag||(window.jstag={}),r=[];function n(e){o[e]=function(){for(var n=arguments.length,t=new Array(n),i=0;i<n;i++)t[i]=arguments[i];r.push([e,t])}}n("send"),n("mock"),n("identify"),n("pageView"),n("unblock"),n("getid"),n("setid"),n("loadEntity"),n("getEntity"),n("on"),n("once"),n("call"),o.loadScript=function(n,t,i){var e=document.createElement("script");e.async=!0,e.src=n,e.onload=t,e.onerror=i;var o=document.getElementsByTagName("script")[0],r=o&&o.parentNode||document.head||document.body,c=o||r.lastChild;return null!=c?r.insertBefore(e,c):r.appendChild(e),this},o.init=function n(t){return this.config=t,this.loadScript(t.src,function(){if(o.init===n)throw new Error("Load error!");o.init(o.config),function(){for(var n=0;n<r.length;n++){var t=r[n][0],i=r[n][1];o[t].apply(o,i)}r=void 0}()}),this}}();
              
              // Define config and initialize Lytics tracking tag.
              // - The setup below will disable the automatic sending of Page Analysis Information (to prevent duplicative sends, as this same information will be included in the jstag.pageView() call below, by default)
              jstag.init({
                src: '${lyticsSrc}'
              });
              
              // You may need to send a page view, depending on your use-case
              jstag.pageView();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LyticsTracker />
                        <LyticsPathforaWrapper 
                  enabled={true}
                  config={{
                    anonymousMessage: true,
                    leadCapture: true,
                    contentRecommendations: true
                  }}
                />
        {children}
      </body>
    </html>
  );
}
