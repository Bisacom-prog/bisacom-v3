import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Product Designer Norwich",
    "UX UI Designer Norwich",
    "Product Designer UK",
    "Freelance Product Designer",
    "Freelance UX UI Designer",
    "Website Designer Norwich",
    "SaaS Product Designer",
    "Mobile App Designer",
    "Figma Designer UK",
    "UX Audit UK",
    "Next.js Developer Norwich",
    "Bisacom",
  ],
  authors: [{ name: siteConfig.personName, url: siteConfig.url }],
  creator: siteConfig.personName,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
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
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.personName,
        url: siteConfig.url,
        jobTitle: "Product Designer",
        sameAs: [siteConfig.linkedIn, siteConfig.github],
        knowsAbout: [
          "Product Design",
          "UX Design",
          "UI Design",
          "Figma",
          "Design Systems",
          "Web Design",
          "Mobile App Design",
          "SaaS Design",
          "React",
          "Next.js",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Norwich",
          addressCountry: "GB",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en-GB",
        publisher: {"@id": `${siteConfig.url}/#person`},
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#business`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        founder: {"@id": `${siteConfig.url}/#person`},
        areaServed: ["Norwich", "United Kingdom", "Remote"],
        serviceType: [
          "UX Audit",
          "Product Design",
          "UX/UI Design",
          "Figma Prototyping",
          "Website Design and Development",
          "Next.js Development",
        ],
      },
    ],
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
