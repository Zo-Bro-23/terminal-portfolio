/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/",
        destination: `/${process.env.NEXT_PUBLIC_BASE_PATH}`,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
