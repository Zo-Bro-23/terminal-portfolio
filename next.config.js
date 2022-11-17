/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/:path*",
        destination: `${process.env.NEXT_PUBLIC_BASE_PATH}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
