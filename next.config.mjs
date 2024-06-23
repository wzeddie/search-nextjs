/** @type {import('next').NextConfig} */
const nextConfig = {

    webpack: (config, { isServer }) => {
        // 扩展现有的别名配置
        config.resolve.alias = {
            ...config.resolve.alias,
            '@app': './src/app',
        };
        return config;
    },
    };

    export default nextConfig;
