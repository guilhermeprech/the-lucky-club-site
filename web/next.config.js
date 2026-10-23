/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },

  async redirects() {
    return ["/admin", "/login", "/account"].flatMap((route) => [
      { source: route, destination: "/", permanent: false },
      { source: `${route}/:path*`, destination: "/", permanent: false },
    ]);
  },
};

module.exports = nextConfig;
