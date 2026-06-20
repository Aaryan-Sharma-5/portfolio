import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { DevToolsHoneypot } from "@/components/DevToolsHoneypot";
import { Providers } from "@/components/Providers";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aaryan-pied.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Aaryan Sharma | Software Engineer",
  description:
    "Full-Stack + AI Developer building production-grade systems with ACID transactions, real-time streams, and AI pipelines. Based in Mumbai.",
  keywords: [
    "Aaryan Sharma",
    "Software Engineer",
    "Full Stack Developer",
    "AI Developer",
    "React",
    "Python",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "ACID Transactions",
    "Real-time Systems",
    "Mumbai Developer",
  ],
  authors: [{ name: "Aaryan Sharma" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Aaryan Sharma | Software Engineer",
    description:
      "Building scalable systems with ACID transactions, real-time data, and AI pipelines.",
    type: "website",
    url: "/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Aaryan Sharma | Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaryan Sharma | Software Engineer",
    description:
      "Building scalable systems with ACID transactions, real-time data, and AI pipelines.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${jetbrains.variable} antialiased`}>
        <DevToolsHoneypot />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
