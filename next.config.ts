import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return [{source: "/from-beginner-to-hired", destination: "/books/from-beginner-to-hired", permanent: true}];
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
