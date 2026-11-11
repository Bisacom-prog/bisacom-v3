import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import CookieConsent from "@/components/site/CookieConsent";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { siteConfig } from "@/lib/site";
import "./globals.css";

  const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

// Applies the saved theme before first paint so dark mode does not flash.
const themeScript = `try{var t=localStorage.getItem("bisacomTheme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Bismark Apenkwah",
    "Product Designer UK",
    "Design Engineer UK",
    "Product Designer Norwich",
    "UX UI Designer Norwich",
    "Freelance Product Designer",
    "Freelance UX UI Designer",
    "Website Designer Norwich",
    "SaaS Product Designer",
    "Mobile App Designer",
    "Figma Designer UK",
    "UX Audit UK",
    "Next.js Developer Norwich",
    "Brand Identity Designer Norwich",
    "Graphic Designer Norwich",
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
    images: [{ url: "/img/hero-product-design-v2.png", width: 1586, height: 992, alt: "Bismark Apenkwah, Product Designer and Design Engineer portfolio" }],
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
    { media: "(prefers-color-scheme: dark)", color: "#050914" },
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
        jobTitle: "Product Designer and Design Engineer",
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
          "TypeScript",
          "Brand Identity Design",
          "Graphic Design",
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
    <html lang="en-GB" className={`h-full antialiased ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="outline-none">{children}</main>
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
