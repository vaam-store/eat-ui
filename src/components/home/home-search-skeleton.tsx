export function HomeSearchSkeleton() {
	return (
		<>
			<div className="rounded-xl bg-base-200 px-4 py-3">
				<div className="flex flex-row gap-4">
					<div>
						<div className="skeleton size-8 rounded-full" />
					</div>
					<div className="grow">
						<div className="skeleton h-8 w-full" />
					</div>
					<div>
						<div className="skeleton size-8 rounded-full" />
					</div>
				</div>
			</div>
		</>
	);
}
