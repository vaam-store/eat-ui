type VendorProfilePageProps = {
	params: {
		id: string;
	};
};

export default function VendorProfilePage({ params }: VendorProfilePageProps) {
	return (
		<div>
			<h1>Vendor Profile: {params.id}</h1>
			<p>Information about vendor {params.id}.</p>
			{/* TODO: Display seller info, rating, featured products, reviews */}
		</div>
	);
}
