'use client';

import { Modal } from '@vaa/components/modal/modal';
import { useParams, useRouter } from 'next/navigation';

export default function ModalProductDetailPage() {
	const router = useRouter();
	const { id } = useParams();
	return (
		<Modal title="Product" open onClose={() => router.back()}>
			<h1>Modal Product: {id}</h1>
			<p>Details for product {id}.</p>
			{/* TODO: Display product details, images, reviews summary, Q&A */}
		</Modal>
	);
}
