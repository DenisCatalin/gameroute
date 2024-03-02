/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "lh4.googleusercontent.com" },
      { hostname: "lh5.googleusercontent.com" },
      { hostname: "lh6.googleusercontent.com" },
      { hostname: "lh2.googleusercontent.com" },
      { hostname: "lh1.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
