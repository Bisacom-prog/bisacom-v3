import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Leave a Client Review",
  description: "Share feedback about your experience working with Bisacom.",
  alternates: {canonical: "/review"},
  robots: {index: false, follow: true},
};

export default function ReviewLayout({children}: Readonly<{children: React.ReactNode}>) {
  return children;
}
