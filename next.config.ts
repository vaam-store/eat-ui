/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { env } from '@vaa/env';
import withPlugins from 'next-compose-plugins';

import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const isDev = env.NODE_ENV !== 'production';

const shouldCache = (nextConfig: NextConfig): NextConfig => {
	if (isDev) {
		return nextConfig;
	}
	return {
		...nextConfig,
		cacheHandler: require.resolve('./cache-handler.mjs'),
		experimental: {
			...nextConfig.experimental,
		},
	};
};

const shouldPwa = (nextConfig: NextConfig): NextConfig => {
	if (!isDev) {
		const withPWA = require('@ducanh2912/next-pwa').default({
			dest: 'public',
		});
		return withPWA(nextConfig);
	}
	return nextConfig;
};

const withImageSizes = (nextConfig: NextConfig): NextConfig => {
	if (isDev) {
		return {
			...nextConfig,
			images: {
				...nextConfig.images,
				remotePatterns: [
					...(nextConfig?.images?.remotePatterns || []),
					{
						hostname: '*',
					},
				],
			},
		};
	}
	return {
		...nextConfig,
		images: {
			...nextConfig.images,
			remotePatterns: [
				...(nextConfig?.images?.remotePatterns || []),
				{
					protocol: 'https',
					hostname: '*.dev.vymalo.com',
				},
				{
					protocol: 'https',
					hostname: '*.store.vymalo.com',
				},
				{
					protocol: 'https',
					hostname: '*.vymalo.com',
				},
				{
					protocol: 'https',
					hostname: '*.vaam.com',
				},
				{
					protocol: 'https',
					hostname: '*.ssegning.me',
				},
				{
					protocol: 'https',
					hostname: '*.ssegning.com',
				},
			],
		},
	};
};

const withImageLoader = (nextConfig: NextConfig): NextConfig => {
	if (isDev) {
		return nextConfig;
	}

	return {
		...nextConfig,
		images: {
			...nextConfig.images,
			loader: 'custom',
			loaderFile: './image-loader.mjs',
		},
	};
};

const withWebpack = (nextConfig: NextConfig): NextConfig => {
	if (isDev) {
		return nextConfig;
	}
	return {
		...nextConfig,
		webpack: (config, context) => {
			config.optimization.splitChunks = {
				chunks: 'all',
			};
			return nextConfig.webpack ? nextConfig.webpack(config, context) : config;
		},
	};
};

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		imageSizes: [
			16, 32, 48, 64, 72, 96, 128, 144, 152, 192, 256, 384, 512, 1024,
		],
	},
	output: 'standalone',
};

export default withPlugins(
	[
		[shouldCache],
		[withImageSizes],
		[withWebpack],
		[withImageLoader],
		[
			withBundleAnalyzer({
				enabled: !isDev,
				openAnalyzer: isDev,
			}),
		],
		[shouldPwa],
	],
	nextConfig,
);
