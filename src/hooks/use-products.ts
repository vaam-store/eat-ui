'use client';

import type { HttpTypes } from '@medusajs/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useMedusa } from '@vaa/medusa';

export function useProducts(query?: HttpTypes.StoreProductListParams) {
	const medusa = useMedusa();

	return useSuspenseQuery({
		queryKey: ['products', query],
		queryFn: async () => {
			try {
				const data = await medusa.store.product.list(query);
				return data.products;
			} catch (e) {
				console.warn('could not load products', e);
				return [];
			}
		},
	});
}
