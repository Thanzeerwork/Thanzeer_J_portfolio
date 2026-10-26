import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeScript } from "@/components/ThemeScript";
import { GridOverlay } from "@/components/GridOverlay";
import { CommandPalette } from "@/components/CommandPalette";
import { MotionController } from "@/components/MotionController";
import { Preloader } from "@/components/Preloader";
import { JsonLd } from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thanzeer-j.is-a.dev";

export const metadata: Metadata = {
  title: {
    default: "Thanzeer J | Full-Stack Developer & Software Developer",
    template: "%s | Thanzeer J",
  },
  description:
    "Portfolio of Thanzeer J, a Full-Stack Developer & Software Engineer specializing in React, Next.js, React Native, Node.js, and cloud database integrations. Explore live case studies and digital builds.",
  metadataBase: new URL(siteUrl),
  authors: [{ name: "Thanzeer J", url: siteUrl }],
  creator: "Thanzeer J",
  publisher: "Thanzeer J",
  keywords: [
    "Thanzeer J",
    "Thanzeer J portfolio",
    "Thanzeer J developer",
    "Full-Stack Developer",
    "Full-Stack Developer Kerala",
    "Software Developer",
    "Software Engineer India",
    "React Developer",
    "Next.js Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Web Developer",
    "Mobile Application Developer",
    "React Native Developer",
    "RyphTech",
    "MealHub",
    "Repairro",
    "Cloud Firestore Developer",
    "Supabase Developer",
  ],
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
  openGraph: {
    type: "website",
    title: "Thanzeer J — Full-Stack Developer & Software Developer",
    description:
      "Explore production case studies, development architecture, and mobile apps built with React, React Native, and Cloud Firestore.",
    url: siteUrl,
    siteName: "Thanzeer J Portfolio",
    locale: "en_US",
    images: [
      {
        url: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/ryphtech-live.png",
        width: 1200,
        height: 630,
        alt: "Thanzeer J - Full-Stack Developer Portfolio & Case Studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thanzeer J — Full-Stack Developer & Software Developer",
    description:
      "Explore production case studies, development architecture, and mobile apps built with React, React Native, and Cloud Firestore.",
    images: ["https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/ryphtech-live.png"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: "./",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" data-accent="blue" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <JsonLd />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="4abb51c3-b9d2-4b64-a181-35434d036431"
          data-domains="ryphtech.in"
          data-do-not-track="true"
        />
      </head>
      <body className="frame">
        <Preloader />
        <a href="#main" className="skip note">
          Skip to content
        </a>
        <MotionController />
        <Header />
        <GridOverlay />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <CommandPalette />
      </body>
    </html>
  );
}
