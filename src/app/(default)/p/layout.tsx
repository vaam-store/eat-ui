import type { ReactNode } from 'react';

export default function ProductLayout({ children }: { children: ReactNode }) {
	return (
		<div className="product-view-layout">
			{/* Common layout for product pages, e.g., breadcrumbs, related products sidebar */}
			{children}
		</div>
	);
}
