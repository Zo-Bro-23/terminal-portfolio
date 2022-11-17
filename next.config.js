/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/:path*",
        destination: `/portfolio/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
