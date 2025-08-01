import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                pathname: '/v0/b/**', // This allows any path under the /v0/b/ segment
            },
        ],
    },
};

export default nextConfig;
