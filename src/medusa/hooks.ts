'use client';

import { medusaContext } from '@vaa/medusa/context';
import { useContext } from 'react';

export function useMedusa() {
	return useContext(medusaContext)!;
}
