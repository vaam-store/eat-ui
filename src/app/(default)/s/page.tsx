import { useRouter } from 'next/router';

export default function SearchResultsPage() {
	const router = useRouter();
	const { category } = router.query; // Get category from URL params

	return (
		<div>
			<h1>Search Results</h1>
			{category && (
				<div>
					<h2>Category: {category}</h2>
					<p>Products in category {category}.</p>
					{/* TODO: List products for this category */}
				</div>
			)}
			<p>Showing results for "..."</p>
			{/* TODO: Display search results */}
		</div>
	);
}
