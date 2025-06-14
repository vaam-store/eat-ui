import { env } from './src/env.js';

export default function emgrImageLoader({ src, width, quality, height }) {
	const url = new URL(env.NEXT_PUBLIC_EMGR_CDN);
	url.searchParams.set('format', 'jpg');

	if (src.startsWith('/')) {
		url.searchParams.set('url', `${env.NEXT_PUBLIC_EMGR_APP_URL}${src}`);
	} else {
		url.searchParams.set('url', src);
	}

	// biome-ignore lint/complexity/noExtraBooleanCast: <explanation>
	if (!!width) {
		url.searchParams.set('width', width.toString());
	}

	// biome-ignore lint/complexity/noExtraBooleanCast: <explanation>
	if (!!height) {
		url.searchParams.set('height', height.toString());
	}

	// biome-ignore lint/complexity/noExtraBooleanCast: <explanation>
	if (!!quality) {
		url.searchParams.set('quality', quality);
	}
	return url.href;
}