import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeScript } from "@/components/ThemeScript";
import { GridOverlay } from "@/components/GridOverlay";
import { CommandPalette } from "@/components/CommandPalette";
import { MotionController } from "@/components/MotionController";

export const metadata: Metadata = {
  title: {
    default: "Thanzeer J | Full-Stack Developer & Software Developer",
    template: "%s | Thanzeer J",
  },
  description:
    "Explore the portfolio of Thanzeer J, a Computer Science and Engineering graduate focused on JavaScript, React, web development, mobile applications, and practical software solutions.",
  metadataBase: new URL("https://ryphtech.in"),
  keywords: [
    "Thanzeer J",
    "Full-Stack Developer",
    "Software Developer",
    "React Developer",
    "JavaScript Developer",
    "Web Developer",
    "Mobile Application Developer",
    "React Native",
    "Portfolio",
    "RyphTech",
  ],
  openGraph: {
    type: "website",
    title: "Thanzeer J — Full-Stack Developer",
    description:
      "Discover my projects, development skills, and approach to building responsive websites, mobile applications, and useful digital products.",
    url: "https://ryphtech.in/",
    siteName: "Thanzeer J Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
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
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="4abb51c3-b9d2-4b64-a181-35434d036431"
          data-domains="ryphtech.in"
          data-do-not-track="true"
        />
      </head>
      <body className="frame">
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
