/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "himaliyansalt.innovationpixel.com",
        port: "",
        pathname: "/storage/app/public/products/**",
      },
    ],
  },
};

export default nextConfig;
