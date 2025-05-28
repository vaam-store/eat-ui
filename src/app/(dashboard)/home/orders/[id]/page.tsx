type OrderDetailPageProps = {
	params: {
		id: string;
	};
};

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
	return (
		<div>
			<h1>Order Details: {params.id}</h1>
			<p>Detailed information for order {params.id}.</p>
			{/* TODO: Display order details, tracking info, support options */}
		</div>
	);
}
