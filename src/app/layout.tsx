import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/lib/currency";
import { UtilityBar } from "@/components/chrome/UtilityBar";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { MarginRuler } from "@/components/chrome/MarginRuler";
import { CJA, SITE } from "@/lib/site";

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
    default: `${CJA.tradingName} & ${SITE.name} — property management for owners who live abroad | Trinidad & Tobago`,
    template: `%s | ${CJA.tradingName} & ${SITE.name}`,
  },
  description:
    `Two companies for owners who don't live in Trinidad & Tobago: ${CJA.tradingName} (US) holds your file and handles compliance and reporting; ${SITE.name} (T&T) is the licensed agency that lets, collects and inspects on the ground.`,
  openGraph: {
    type: "website",
    siteName: `${CJA.tradingName} & ${SITE.name}`,
    locale: "en_TT",
  },
  twitter: {
    card: "summary_large_image",
  },
};

/**
 * Two entities, two JSON-LD types. CJA is an Organization providing
 * administrative services — never described as a real estate agent, since
 * a US company cannot lawfully act as one in T&T, and never described as
 * filing with the Inland Revenue Division. Ebenezer is the RealEstateAgent,
 * licensed and FIU-registered on the ground.
 */
const cjaJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: CJA.legalName,
  telephone: CJA.phoneDisplay,
  url: SITE.url,
  description:
    "Compliance administration, Landlord Business Surcharge filing coordination and reporting for Trinidad & Tobago property owners who live abroad. Not a real estate agent, does not file with the Inland Revenue Division, and does not hold client funds.",
};

const ebenezerJsonLd = {
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
    `Licensed, FIU-registered real estate agency handling letting, rent collection, IRD filing, inspections and title work in Trinidad & Tobago, working alongside ${CJA.tradingName} for owners who live abroad.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} h-full`}
    >
      <body className="bg-grain flex min-h-full flex-col antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cjaJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ebenezerJsonLd) }} />
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
