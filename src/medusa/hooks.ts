'use client';

import { useContext } from 'react';
import { medusaContext } from './context';

export function useMedusa() {
	const contextValue = useContext(medusaContext);

	if (!contextValue) {
		throw new Error('useMedusa must be used within a MedusaContext.Provider');
	}

	return contextValue;
}
