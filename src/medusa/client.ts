import Medusa from '@medusajs/js-sdk';
import { env } from '@vaa/env';
import { ForageStorage } from './storage';

export const createMedusa = () =>
	new Medusa({
		baseUrl: env.NEXT_PUBLIC_MEDUSA_API_BASE_URL,
		publishableKey: env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
		debug: env.NEXT_PUBLIC_MEDUSA_DEBUG,
		auth: {
			type: 'jwt',
			jwtTokenStorageMethod: 'custom',
			storage: new ForageStorage(),
		},
	});
