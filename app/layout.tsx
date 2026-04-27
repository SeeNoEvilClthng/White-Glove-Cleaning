import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://propsniper.example"),
  title: "Prop Sniper | Real Estate Lead Platform",
  description:
    "Prop Sniper is a purple-and-black real estate lead platform for list building, lead routing, and investor outreach workflows.",
  openGraph: {
    title: "Prop Sniper",
    description:
      "Run data, pipeline, and outreach from one investor-focused operating system.",
    url: "https://propsniper.example",
    siteName: "Prop Sniper",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
