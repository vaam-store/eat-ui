'use client';

import type { FindParams, HttpTypes } from '@medusajs/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useMedusa } from '@vaa/medusa';

export function useCategories(
	query?: FindParams & HttpTypes.StoreProductCategoryListParams,
) {
	const medusa = useMedusa();

	return useSuspenseQuery({
		queryKey: ['categories', query],
		queryFn: async () => {
			try {
				const data = await medusa.store.category.list(query);
				return data.product_categories;
			} catch (e) {
				console.warn('could not load categories', e);
				return [];
			}
		},
	});
}
