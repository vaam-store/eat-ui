import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	/**
	 * Specify your server-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars.
	 */
	server: {
		NODE_ENV: z
			.enum(['development', 'test', 'production'])
			.default('development'),
		OPENAI_API_KEY: z.string(),
		OPENAI_API_BASE_URL: z.string().url(),
		MEDUSA_API_KEY: z.string(),
		MEDUSA_API_BASE_URL: z.string().url(),
		MEDUSA_PUBLISHABLE_KEY: z.string(),
	},

	/**
	 * Specify your client-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars. To expose them to the client, prefix them with
	 * `NEXT_PUBLIC_`.
	 */
	client: {
		// NEXT_PUBLIC_CLIENTVAR: z.string(),
		NEXT_PUBLIC_IMAGE_LOADER_URL: z.string().url(),
		NEXT_PUBLIC_MEDUSA_API_BASE_URL: z.string().url(),
		NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY: z.string(),
		NEXT_PUBLIC_MEDUSA_DEBUG: z
			.string()
			.optional()
			.transform((i) => i === 'true'),
	},

	/**
	 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
	 * middlewares) or client-side so we need to destruct manually.
	 */
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		OPENAI_API_KEY: process.env.OPENAI_API_KEY,
		OPENAI_API_BASE_URL: process.env.OPENAI_API_BASE_URL,
		MEDUSA_API_KEY: process.env.MEDUSA_API_KEY,
		MEDUSA_API_BASE_URL: process.env.MEDUSA_API_BASE_URL,
		MEDUSA_PUBLISHABLE_KEY: process.env.MEDUSA_PUBLISHABLE_KEY,
		// NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
		NEXT_PUBLIC_IMAGE_LOADER_URL: process.env.NEXT_PUBLIC_IMAGE_LOADER_URL,
		NEXT_PUBLIC_MEDUSA_API_BASE_URL:
			process.env.NEXT_PUBLIC_MEDUSA_API_BASE_URL,
		NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY:
			process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
		NEXT_PUBLIC_MEDUSA_DEBUG: process.env.NEXT_PUBLIC_MEDUSA_DEBUG,
	},
	/**
	 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
	 * useful for Docker builds.
	 */
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	/**
	 * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
	 * `SOME_VAR=''` will throw an error.
	 */
	emptyStringAsUndefined: true,
});
