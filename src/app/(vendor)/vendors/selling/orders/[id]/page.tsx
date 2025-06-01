type SellerOrderDetailPageProps = {
	params: {
		id: string;
	};
};

export default function SellerOrderDetailPage({
	params,
}: SellerOrderDetailPageProps) {
	return (
		<div>
			<h1>Sales Order Detail: {params.id}</h1>
			<p>Details for sales order {params.id}.</p>
			{/* TODO: Display sales order details, customer info, shipping status */}
		</div>
	);
}
