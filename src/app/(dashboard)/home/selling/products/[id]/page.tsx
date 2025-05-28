type EditProductPageProps = {
	params: {
		id: string;
	};
};

export default function EditProductPage({ params }: EditProductPageProps) {
	return (
		<div>
			<h1>Edit Product: {params.id}</h1>
			<p>Modify the details of your product listing {params.id}.</p>
			{/* TODO: Display form to edit an existing product */}
		</div>
	);
}
