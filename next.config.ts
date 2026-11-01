import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
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
