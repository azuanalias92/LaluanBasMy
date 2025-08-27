import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { LanguageProvider } from "./context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "LaluanBasMY - Bus Route Explorer",
    template: "%s | LaluanBasMY"
  },
  description: "Explore bus routes in Alor Setar, Kedah with interactive maps and real-time information. Find the best routes, schedules, and connections for public transportation.",
  keywords: ["Bas MY", "LaluanBasMY", "bus routes", "Alor Setar", "Kedah", "public transport", "Malaysia", "bus schedule", "route planner", "transportation"],
  authors: [{ name: "LaluanBasMY Team" }],
  creator: "LaluanBasMY",
  publisher: "LaluanBasMY",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://laluanbas.my'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'ms-MY': '/ms-MY',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'LaluanBasMY - Bus Route Explorer',
    description: 'Explore bus routes in Alor Setar, Kedah with interactive maps and real-time information. Find the best routes, schedules, and connections for public transportation.',
    siteName: 'LaluanBasMY',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LaluanBasMY - Bus Route Explorer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LaluanBasMY - Bus Route Explorer',
    description: 'Explore bus routes in Alor Setar, Kedah with interactive maps and real-time information.',
    images: ['/og-image.png'],
    creator: '@laluanbasmy',
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "LaluanBasMY",
              "description": "Bus route explorer for Alor Setar, Kedah",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://laluanbas.my",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || "https://laluanbas.my"}/map?search={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "LaluanBasMY",
                "url": process.env.NEXT_PUBLIC_SITE_URL || "https://laluanbas.my"
              }
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full bg-background text-foreground`}>
        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
