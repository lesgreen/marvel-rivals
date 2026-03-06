import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marvel Rivals API Next.js App",
  description: "Simple Next.js starter that calls the Marvel Rivals API"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
