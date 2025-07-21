import {PropsWithChildren, ReactNode} from 'react';

export default function ModalProductLayout({
	children,
}: Readonly<PropsWithChildren>) {
	return (
		<div className="product-view-layout">
			{/* Common layout for product pages, e.g., breadcrumbs, related products sidebar */}
			{children}
		</div>
	);
}
