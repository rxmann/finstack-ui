/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_API_BASE_URL + "/api/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;

