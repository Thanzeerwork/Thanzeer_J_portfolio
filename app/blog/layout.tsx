import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering & Development Blog | Thanzeer J",
  description:
    "Field notes on modern web and mobile application development, full-stack architecture, and software engineering.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
