import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost:3000",
    "nonephemeral-malinda-cylinderlike.ngrok-free.dev",
  ],
};

export default nextConfig;
