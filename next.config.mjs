/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://gameroute.vercel.app/",
          },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "lh4.googleusercontent.com" },
      { hostname: "lh5.googleusercontent.com" },
      { hostname: "lh6.googleusercontent.com" },
      { hostname: "lh2.googleusercontent.com" },
      { hostname: "lh1.googleusercontent.com" },
      { hostname: "assets.csnades.gg" },
    ],
  },
};

export default nextConfig;
