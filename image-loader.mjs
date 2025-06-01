import { env } from './src/env.js';

export default function myImageLoader({ src, width, quality }) {
	return `${env.NEXT_PUBLIC_IMAGE_LOADER_URL}/url=${encodeURIComponent(src)}?width=${width}&height=${width}&quality=${quality || 75}`;
}
