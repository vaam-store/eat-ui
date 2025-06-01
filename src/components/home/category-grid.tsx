'use client';

import { useCategories } from '@vaa/hooks/use-categories';

export function CategoryGrid() {
	const { data } = useCategories();
	return (
		<div className="grid grid-cols-2 ld:grid-cols-6 gap-4 sm:grid-cols-3 md:grid-cols-4">
			{data.map((cat) => (
				<div key={cat.id} className="card bg-base-200">
					<div className="card-body">
						<h2 className="card-title">{cat.name}</h2>
						<span>{cat.handle}</span>
					</div>
				</div>
			))}
		</div>
	);
}
