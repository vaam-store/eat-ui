import { createOpenAI } from '@ai-sdk/openai';
import { env } from '@vaa/env';

const createOpenaiClient = () =>
	createOpenAI({
		apiKey: env.OPENAI_API_KEY,
		baseURL: env.OPENAI_API_BASE_URL,
	});

const globalForOpenai = globalThis as unknown as {
	openai: ReturnType<typeof createOpenaiClient> | undefined;
};

export const openai = globalForOpenai.openai ?? createOpenaiClient();

if (env.NODE_ENV !== 'production') globalForOpenai.openai = openai;
