'use client';

import { type PropsWithChildren, useState } from 'react';
import { createMedusa } from './client';
import { medusaContext } from './context';

export function MedusaProvider({ children }: PropsWithChildren) {
	const [medusaClient] = useState(createMedusa());

	return (
		<medusaContext.Provider value={medusaClient}>
			{children}
		</medusaContext.Provider>
	);
}
