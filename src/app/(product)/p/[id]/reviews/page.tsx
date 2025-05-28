type ProductReviewsPageProps = {
	params: {
		id: string;
	};
};

export default function ProductReviewsPage({
	params,
}: ProductReviewsPageProps) {
	return (
		<div>
			<h1>Reviews for Product: {params.id}</h1>
			<p>All reviews for product {params.id}.</p>
			{/* TODO: Display all reviews and rating interface */}
		</div>
	);
}
