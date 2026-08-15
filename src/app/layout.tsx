import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/lib/currency";
import { UtilityBar } from "@/components/chrome/UtilityBar";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { MarginRuler } from "@/components/chrome/MarginRuler";
import { SITE } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — property management for owners who live abroad | Trinidad & Tobago`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "The Trinidad & Tobago agency built for owners who don't live here. Landlord Business Surcharge registration, quarterly filing, rent collection, inspections and reporting for overseas property owners.",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_TT",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: SITE.legalName,
  telephone: SITE.phoneDisplay,
  url: SITE.url,
  areaServed: {
    "@type": "Country",
    name: "Trinidad and Tobago",
  },
  description:
    "Property management, Landlord Business Surcharge compliance and reporting for Trinidad & Tobago owners who live abroad.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} h-full`}
    >
      <body className="bg-grain flex min-h-full flex-col antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <CurrencyProvider>
          <a
            href="#main"
            className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-2 focus-visible:left-2 focus-visible:z-[100] focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2 focus-visible:text-white"
          >
            Skip to content
          </a>
          <MarginRuler />
          <UtilityBar />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </CurrencyProvider>
      </body>
    </html>
  );
}
