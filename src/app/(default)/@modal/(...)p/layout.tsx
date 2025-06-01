import type { ReactNode } from 'react';

export default function ModalProductLayout({
	children,
}: { children: ReactNode }) {
	return (
		<div className="product-view-layout">
			{/* Common layout for product pages, e.g., breadcrumbs, related products sidebar */}
			{children}
		</div>
	);
}
