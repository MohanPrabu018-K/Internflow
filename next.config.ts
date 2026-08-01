import type { NextConfig } from "next";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig: NextConfig = {
  distDir: ".next",
  output: "standalone",
  outputFileTracingRoot: join(__dirname),
};

export default nextConfig;
