import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "u9a6wmr3as.ufs.sh" },
      { hostname: "wallpapers.com" },
      { hostname: "shuttledelivery.co.kr" },
      { hostname: "www.shuttledelivery.co.kr" }, // Adicionando o hostname correto
      { hostname: "media.bizj.us" },
      { hostname: "cdn.sanity.io" },
    ], // Add the hostname of the image server to make it a valid source
  },
}

export default nextConfig