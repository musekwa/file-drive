/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'cool-kiwi-479.convex.cloud',
            },
        ],
    }
};

export default nextConfig;
