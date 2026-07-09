import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://upload.wikimedia.org/wikipedia/commons/1/1f/Time_and_Death.jpg",
      ),
    ],
  },
};

export default nextConfig;
