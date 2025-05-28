type ProductDetailPageProps = {
	params: {
		id: string;
	};
};

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
	return (
		<div>
			<h1>Product: {params.id}</h1>
			<p>Details for product {params.id}.</p>
			{/* TODO: Display product details, images, reviews summary, Q&A */}
		</div>
	);
}
