/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,

    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.igdb.com' },
      { protocol: 'https', hostname: 'www.nintendo-insider.com' },
      { protocol: 'https', hostname: 'assets-prd.ignimgs.com' },
      { protocol: 'https', hostname: 'cdn.wccftech.com' },
      { protocol: 'https', hostname: 'static0.thegamerimages.com' },
      { protocol: 'https', hostname: 'static0.gamerantimages.com' },
      { protocol: 'https', hostname: 'assets-prd.ignimgs.com' },
      { protocol: 'https', hostname: 'www.gametonix.com' },
      { protocol: 'https', hostname: 'gepig.com' },
      { protocol: 'https', hostname: 'cdn.thegameawards.com' },
    ],
  },
};

export default nextConfig;
