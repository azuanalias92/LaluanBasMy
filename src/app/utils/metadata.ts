import type { Metadata } from "next";

type Language = 'ms' | 'en';

interface TranslationFunction {
  (key: string): string;
}

interface MetadataConfig {
  language: Language;
  t: TranslationFunction;
  baseUrl?: string;
}

export function generateMetadata({ language, t, baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://laluanbas.my" }: MetadataConfig): Metadata {
  const locale = language === 'ms' ? 'ms_MY' : 'en_US';
  const ogLocale = language === 'ms' ? 'ms_MY' : 'en_US';
  
  return {
    title: {
      default: t('seo.title'),
      template: `%s | ${t('seo.siteName')}`,
    },
    description: t('seo.description'),
    keywords: t('seo.keywords').split(', '),
    authors: [{ name: t('seo.creator') }],
    creator: t('seo.creator'),
    publisher: t('seo.publisher'),
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en-US",
        "ms-MY": "/ms-MY",
        "en": "/en",
        "ms": "/ms",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: language === 'ms' ? 'en_US' : 'ms_MY',
      url: "/",
      title: t('seo.ogTitle'),
      description: t('seo.ogDescription'),
      siteName: t('seo.siteName'),
      images: [
        {
          url: language === 'ms' ? "/og-image-ms.png" : "/og-image-en.png",
          width: 1200,
          height: 630,
          alt: t('seo.ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t('seo.twitterTitle'),
      description: t('seo.twitterDescription'),
      images: [language === 'ms' ? "/og-image-ms.png" : "/og-image-en.png"],
      creator: "@laluanbasmy",
      site: "@laluanbasmy",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

export function generateStructuredData({ language, t, baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://laluanbas.my" }: MetadataConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t('seo.schemaName'),
    description: t('seo.schemaDescription'),
    url: baseUrl,
    inLanguage: language === 'ms' ? 'ms-MY' : 'en-US',
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/map?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: t('seo.publisher'),
      url: baseUrl,
    },
  };
}

// Helper function to get translations for server components
export async function getTranslations(language: Language): Promise<Record<string, string>> {
  try {
    if (language === 'ms') {
      const translations = await import('../translations/ms.json');
      return translations.default;
    } else {
      const translations = await import('../translations/en.json');
      return translations.default;
    }
  } catch (error) {
    console.error('Failed to load translations:', error);
    // Fallback to Malay translations
    const fallback = await import('../translations/ms.json');
    return fallback.default;
  }
}

// Helper function to create translation function
export function createTranslationFunction(translations: Record<string, string>): TranslationFunction {
  return (key: string): string => {
    return translations[key] || key;
  };
}