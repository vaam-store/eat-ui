type VendorProductsPageProps = {
	params: {
		id: string;
	};
};

export default function VendorProductsPage({
	params,
}: VendorProductsPageProps) {
	return (
		<div>
			<h1>Products by Vendor: {params.id}</h1>
			<p>All products from vendor {params.id}.</p>
			{/* TODO: List all products by this vendor */}
		</div>
	);
}
