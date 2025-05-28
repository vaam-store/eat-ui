'use client';

import { SearchInput } from '../search/search-input';

export function SearchBarRow() {
	const handleSearch = (query: string) => {
		console.log('Searching for:', query);
	};

	return (
		<div className="container mx-auto w-full px-4">
			<div className="w-full">
				<SearchInput
					onSearch={handleSearch}
					placeholder="Search dishes, cuisines, or restaurants"
				/>
			</div>
		</div>
	);
}
