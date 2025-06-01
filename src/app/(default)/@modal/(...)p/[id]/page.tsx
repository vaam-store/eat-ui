'use client';

import { ModalPageWrapper } from '@vaa/components/modal';
import { useParams } from 'next/navigation';

export default function ModalProductDetailPage() {
	const { id } = useParams();
	return (
		<ModalPageWrapper title={'Product Details'}>
			<h1>Modal Product: {id}</h1>
			<p>Details for product {id}.</p>
			{/* TODO: Display product details, images, reviews summary, Q&A */}
		</ModalPageWrapper>
	);
}
