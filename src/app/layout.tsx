import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans, IBM_Plex_Mono, Amiri } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { site } from "@/data/site";
import { skripUkuranHuruf } from "@/lib/nav";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Serambi · Travel Umroh & Haji Khusus dari Bandung",
    template: "%s · Serambi Umroh & Haji",
  },
  description:
    "Paket umroh 9–15 hari dan haji khusus dari Bandung. Jarak hotel ditulis dalam meter, harga dirinci sampai pos terakhir, jadwal per hari, dan panduan manasik lengkap.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Serambi Umroh & Haji",
    images: [{ url: "/photos/haram-kabah.jpg" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f5efe2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${fraunces.variable} ${instrument.variable} ${mono.variable} ${amiri.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: skripUkuranHuruf }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#isi"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded focus:bg-tinta focus:px-3 focus:py-2 focus:text-kertas"
        >
          Lewati ke konten
        </a>
        <Header />
        <main id="isi" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
