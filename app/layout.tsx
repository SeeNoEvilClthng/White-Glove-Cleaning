import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://whiteglovecleaning.example"),
  title: "White Glove Cleaning | Phoenix Metro Home Cleaning",
  description:
    "Premium house cleaning for busy Phoenix Metro homes. Book deep cleans, recurring service, and move-in or move-out cleanings online.",
  openGraph: {
    title: "White Glove Cleaning",
    description:
      "Premium home cleaning across the Phoenix Metro with fast booking and secure online payment.",
    url: "https://whiteglovecleaning.example",
    siteName: "White Glove Cleaning",
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
