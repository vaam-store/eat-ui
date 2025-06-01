export function CategorySkeleton() {
	return (
		<div className="grid grid-cols-2 ld:grid-cols-6 gap-4 sm:grid-cols-3 md:grid-cols-4">
			{[1, 2, 3, 4, 5, 6].map((l) => (
				<div key={l} className="card bg-base-200">
					<div className="card-body">
						<div className="skeleton h-4 w-28" />
						<div className="skeleton h-4 w-full" />
					</div>
				</div>
			))}
		</div>
	);
}
