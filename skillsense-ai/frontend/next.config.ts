import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Zero Tolerance Error Nuke: Enforce checks during build
    typescript: {
        ignoreBuildErrors: false,
    },
};

export default nextConfig;
