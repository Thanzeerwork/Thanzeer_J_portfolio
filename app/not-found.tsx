import type { Metadata } from "next";
import { Block404_8 } from "@/components/blocks/404-8";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The requested page could not be found on Thanzeer J's portfolio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <Block404_8
      title="Confirmed: this page is gone."
      description="We ran the request ourselves: no redirect, no cache, no luck. Pick a live route from the printout, or head back home."
      homeLink="/"
      homeText="Back home"
      contactLink="/contact"
      contactText="Contact Thanzeer"
      host="thanzeer-j.is-a.dev"
      routes={[
        { path: "/", label: "home" },
        { path: "/#work", label: "case studies & engineering" },
        { path: "/services", label: "technical capabilities" },
        { path: "/about", label: "about & background" },
        { path: "/blog", label: "developer insights" },
        { path: "/contact", label: "start a conversation" },
      ]}
    />
  );
}
