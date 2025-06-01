'use client';

import {
	SearchInput,
	type SearchLocationParams,
} from '@vaa/components/search/search-input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function HomeSearch() {
	const router = useRouter();

	const searchParams = useSearchParams();
	const createQueryString = useCallback(
		(...kvs: [string, string][]) => {
			const params = new URLSearchParams(searchParams.toString());
			for (const [name, value] of kvs) {
				params.set(name, encodeURIComponent(value));
			}

			return params.toString();
		},
		[searchParams],
	);

	const searchByLocation = (data: SearchLocationParams) => {
		const p = btoa(
			JSON.stringify({ latitude: data.latitude, longitude: data.longitude }),
		);
		const queries = createQueryString(['q', data.query], ['p', p]);
		router.push(`/search?${queries}`);
	};

	const onSearch = (query: string) => {
		const queries = createQueryString(['q', query]);
		router.push(`/search?${queries}`);
	};

	return (
		<SearchInput
			onSearch={onSearch}
			onMapPin={(data) => searchByLocation(data)}
			checkLocationDelivery
		/>
	);
}
