import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import Script from "next/script";

import type { CSSProperties } from "react";
import type { Metadata } from "next";

import "./globals.css";

import ClientWrapper from "@/components/common/client-wrapper";

export const metadata: Metadata = {
  title: "Sri DurgaDevi Matrimony | Find Your Perfect Match",
  description: "Connecting hearts, creating families. Your trusted partner in finding true love.",
  keywords: ["Matrimony", "Marriage Bureau", "Chennai Matrimony", "Tamil Matrimony", "SDM"],
  authors: [{ name: "Sri DurgaDevi Matrimony", url: "https://sdmatrimony.com" }],
  applicationName: "SDMatrimony",
  manifest: "/manifest.json",
  openGraph: {
    title: "Sri DurgaDevi Matrimony",
    description: "Connecting hearts, creating families. Your trusted partner in finding true love.",
    url: "https://sdmatrimony.com",
    siteName: "SDMatrimony",
    images: [
      {
        url: "/imgs/og_image.png",
        width: 1200,
        height: 630,
        alt: "Sri DurgaDevi Matrimony"
      }
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri DurgaDevi Matrimony",
    description: "Find your perfect match with SDMatrimony.",
    images: ["/imgs/og_image.png"],
  },
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/android-icon-192x192.png", sizes: "192x192", type: "image/png" }
    ],
    apple: [
      { url: "/icons/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/icons/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/icons/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/icons/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/icons/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/icons/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/icons/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/icons/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/icons/apple-icon-180x180.png", sizes: "180x180" }
    ],
  },
}

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sri DurgaDevi Matrimony",
  "alternateName": "Sri DurgaDevi Thirumana Thagaval Maiyam",
  "url": "https://sdmatrimony.com",
  "logo": "https://sdmatrimony.com/logos/logo-1024.png",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91-9791155234",
      "contactType": "customer service",
      "email": "admin@sdmatrimony.com",
      "areaServed": "IN",
      "availableLanguage": ["en", "ta"]
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "No. 1, Sri Laxmi Nagar, 3rd Main Street, Alwarthirunagar, Mettukuppam",
    "addressLocality": "Chennai",
    "postalCode": "600087",
    "addressCountry": "IN"
  }
}

function RootLayout({ children }: readOnlyChildren) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          {children}
        </ClientWrapper>

        <Toaster
          position="top-right"
          closeButton
          richColors
          style={{
            "--width": "300px",
            "--toast-close-button-start": "calc(100% - 2px)"
          } as CSSProperties}
        />

        <Script id="ld-json-org" type="application/ld+json">
          {JSON.stringify(jsonLdOrg)}
        </Script>

        <SpeedInsights />
      </body>
    </html >
  );
}

export default RootLayout