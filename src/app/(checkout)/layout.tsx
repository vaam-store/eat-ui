import type { ReactNode } from 'react';

export default function CheckoutLayout({
	children,
}: {
	children: ReactNode;
}) {
	// Add checkout-specific middleware logic here
	// Removed console log for production
	return <>{children}</>;
}
