import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["Freelance Product Designer", "Freelance UI UX Designer", "Website Designer Norwich", "Product Designer Norwich", "UX Audit UK", "Next.js Developer Norwich", "Figma Designer UK", "Bisacom"],
  authors: [{ name: "Bismark Apenkwah", url: siteConfig.url }],
  creator: "Bismark Apenkwah",
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_GB",
    type: "website",
    images: [{ url: "/img/hero-product-design-v2.png", width: 1586, height: 992, alt: "Bisacom product design portfolio" }],
  },
  twitter: { card: "summary_large_image", title: siteConfig.title, description: siteConfig.description, images: ["/img/hero-product-design-v2.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f9fc" },
    { media: "(prefers-color-scheme: dark)", color: "#070b14" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Bisacom",
    url: siteConfig.url,
    email: siteConfig.email,
    founder: { "@type": "Person", name: "Bismark Apenkwah", jobTitle: "Product Designer" },
    areaServed: ["United Kingdom", "Remote"],
    serviceType: ["UX Audit", "Product Design", "UX/UI Design", "Figma Prototyping", "Website Design and Development", "Next.js Development"],
  };
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground selection:bg-brand/20 selection:text-foreground">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
