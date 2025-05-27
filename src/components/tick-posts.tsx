'use client';

import { api } from '@vaa/trpc/react';

export function TickPosts() {
	const { data, isPending, isError } = api.post.iterable.useQuery();

	if (isPending) {
		return <div className="w-full max-w-xs">Loading...</div>;
	}

	if (isError) {
		return <div className="w-full max-w-xs">Error: {data}</div>;
	}

	return (
		<div className="w-full max-w-xs">
			<div className="list">
				{data.map((i) => (
					<li id={`k-${i}`}>{i}</li>
				))}
			</div>
		</div>
	);
}
