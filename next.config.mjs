/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-4a28b0907aff4bb4a7bc257eaa71091d.r2.dev",
        pathname: "/nemu/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_R2_S3_DEV_URL: process.env.R2_S3_DEV_URL,
  },
};

export default nextConfig;
