import type {NextConfig} from "next";

// 'unsafe-inline' is needed for scripts because Next.js inlines bootstrap scripts on static
// pages; nonces would force every page to render dynamically. Gumroad is allowed for its checkout.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://gumroad.com https://*.gumroad.com",
  "style-src 'self' 'unsafe-inline' https://*.gumroad.com",
  "img-src 'self' data: blob: https://cdn.sanity.io https://*.gumroad.com",
  "media-src 'self' https://cdn.sanity.io",
  "font-src 'self' https://*.gumroad.com",
  "connect-src 'self' https://gumroad.com https://*.gumroad.com",
  "frame-src https://gumroad.com https://*.gumroad.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {key: "Content-Security-Policy", value: contentSecurityPolicy},
          {key: "X-Frame-Options", value: "DENY"},
          {key: "X-Content-Type-Options", value: "nosniff"},
          {key: "Referrer-Policy", value: "strict-origin-when-cross-origin"},
          {key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()"},
        ],
      },
    ];
  },
  async redirects() {
    return [
      {source: "/from-beginner-to-hired", destination: "/books/from-beginner-to-hired", permanent: true},
      {source: "/ai-business-systems", destination: "/books/ai-business-systems", permanent: true},
      // Insights was removed; old article links land on the homepage.
      {source: "/blog", destination: "/", permanent: true},
      {source: "/blog/:path*", destination: "/", permanent: true},
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
