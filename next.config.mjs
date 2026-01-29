/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: '/Users/dhruveshshyara/Desktop/portfolio/portfolio-nextjs',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
