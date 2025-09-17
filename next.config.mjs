/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "himaliyansalt.innovationpixel.com",
        port: "",
        pathname: "/public/storage/product/**",
      },
    ],
  },
};

export default nextConfig;
