/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
    };

    // Add loader for .wasm files
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource', // Use 'asset/resource' for Webpack 5
    });

    // Add loader for .zkey files (binary files)
    config.module.rules.push({
      test: /\.zkey$/,
      type: 'asset/resource', // Handle binary files like .zkey as assets
    });

    // Solve "Module not found: Can't resolve 'pino-pretty'" warning
    config.externals.push('pino-pretty', 'encoding');

    return config;
  },
};

export default nextConfig;
