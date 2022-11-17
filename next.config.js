/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/:path*",
        destination: `/portfolio/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
