import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: isGithubActions ? "export" : undefined,
  images: {
    unoptimized: true,
  },
  basePath: isGithubActions ? "/narviya_website_test" : undefined,
};

export default nextConfig;
