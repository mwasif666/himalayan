/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "himaliyansalt.innovationpixel.com",
        pathname: "/public/**",
      },
    ],
  },
};

export default nextConfig;
