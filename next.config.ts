import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
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
	experimental: {
		authInterrupts: true,
	},
};

export default nextConfig;
