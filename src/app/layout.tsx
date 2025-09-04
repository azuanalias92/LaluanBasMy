import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { generateMetadata as generateDynamicMetadata, getTranslations, createTranslationFunction } from "./utils/metadata";
import { StructuredDataScript } from "./components/StructuredDataScript";
import SocialShareWidget from "./components/SocialShareWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Generate metadata dynamically based on language preference
export async function generateMetadata(): Promise<Metadata> {
  // Default to Malay (ms) as it's the primary language for Malaysian users
  const language = 'ms';
  const translations = await getTranslations(language);
  const t = createTranslationFunction(translations);
  
  return generateDynamicMetadata({ language, t });
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms" className="h-full">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LaluanBasMY" />
        <StructuredDataScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full bg-background text-foreground`}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <Navigation />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <SocialShareWidget />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
