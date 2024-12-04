/** @type {import('next').NextConfig} */
const nextConfig = {
    webpackDevMiddleware: config => {
      config.watchOptions = {
        poll: 1000, // Verifica mudanças a cada 1000ms
        aggregateTimeout: 300, // Tempo de espera antes de aplicar mudanças
      };
      return config;
    },
    experimental: {
      appDir: true, // Garante que a App Directory está habilitada
    },
  };
  
  export default nextConfig;
  