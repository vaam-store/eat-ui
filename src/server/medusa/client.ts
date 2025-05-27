import Medusa from '@medusajs/js-sdk';
import { env } from '@vaa/env';

const createMedusa = () =>
	new Medusa({
		apiKey: env.MEDUSA_API_KEY,
		baseUrl: env.MEDUSA_API_BASE_URL,
		publishableKey: env.MEDUSA_PUBLISHABLE_KEY,
		debug: env.NEXT_PUBLIC_MEDUSA_DEBUG,
	});

const globalForMedusa = globalThis as unknown as {
	medusa: ReturnType<typeof createMedusa> | undefined;
};

export const medusa = globalForMedusa.medusa ?? createMedusa();

if (env.NODE_ENV !== 'production') globalForMedusa.medusa = medusa;
