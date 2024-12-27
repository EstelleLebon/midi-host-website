import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    localPatterns: [
      {
        pathname: '/**',
        search: '',
      },
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'w3.org',
        port: '',
        pathname: '/2000/svg/**',
        search: '',
      },
    ],
  },
      
};

export default nextConfig;
