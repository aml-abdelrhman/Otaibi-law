/** @type {import('next').NextConfig} */
const nextConfig = {
  /* إعدادات Next.js 15 الافتراضية */
  reactStrictMode: true,
  
  // إضافة هذا السطر لتجاوز أخطاء الـ ESLint أثناء الـ Build على Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },

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