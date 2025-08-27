import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Interactive Bus Route Map',
  description: 'Explore Alor Setar bus routes with our interactive map. Find bus stops, view routes, check schedules, and plan your journey with real-time information.',
  keywords: ['bus map', 'Alor Setar map', 'interactive bus routes', 'bus stops', 'route planner', 'public transport map', 'Kedah bus map'],
  openGraph: {
    title: 'Interactive Bus Route Map | LaluanBasMY',
    description: 'Explore Alor Setar bus routes with our interactive map. Find bus stops, view routes, check schedules, and plan your journey.',
    url: '/map',
    images: [
      {
        url: '/og-map.png',
        width: 1200,
        height: 630,
        alt: 'LaluanBasMY Interactive Bus Route Map',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interactive Bus Route Map | LaluanBasMY',
    description: 'Explore Alor Setar bus routes with our interactive map. Find bus stops, view routes, and check schedules.',
    images: ['/og-map.png'],
  },
  alternates: {
    canonical: '/map',
  },
}

export default function MapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "LaluanBasMY Bus Route Map",
            "description": "Interactive map for exploring bus routes in Alor Setar, Kedah",
            "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://laluanbas.my'}/map`,
            "applicationCategory": "TravelApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "MYR"
            },
            "featureList": [
              "Interactive bus route visualization",
              "Real-time bus stop information",
              "Route planning and navigation",
              "Nearest bus stop finder"
            ],
            "provider": {
              "@type": "Organization",
              "name": "LaluanBasMY",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://laluanbas.my"
            }
          })
        }}
      />
      {children}
    </>
  )
}