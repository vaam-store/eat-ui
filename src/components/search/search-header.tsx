'use client';

import {
	SearchInput,
	type SearchLocationParams,
} from '@vaa/components/search/search-input';
import { useRouter } from 'next/navigation';

export function SearchHeader() {
	const router = useRouter();

	const searchByLocation = (data: SearchLocationParams) => {
		const p = btoa(
			JSON.stringify({ latitude: data.latitude, longitude: data.longitude }),
		);
		router.push(`/search?q=${encodeURIComponent(data.query)}&p=${p}`);
	};

	const onSearch = (query: string) => {
		router.push(`/search?q=${encodeURIComponent(query)}`);
	};

	return (
		<>
			<SearchInput
				onSearch={onSearch}
				onMapPin={(data) => searchByLocation(data)}
			/>
		</>
	);
}
