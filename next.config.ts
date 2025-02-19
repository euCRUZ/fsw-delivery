import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "u9a6wmr3as.ufs.sh" },
      { hostname: "wallpapers.com" },
    ], // Add the hostname of the image server to make it a valid source
  },
}

export default nextConfig

// https://wallpapers.com/images/hd/aesthetic-mcdonald-s-store-7r2ldise5y3ixv9g.jpg
