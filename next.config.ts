/** @type {import('next').NextConfig} */
const nextConfig = {
  /* إعدادات Next.js 15 الافتراضية */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;