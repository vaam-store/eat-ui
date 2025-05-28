import type { ReactNode } from 'react';

export default function DashboardLayout({
	children,
}: {
	children: ReactNode;
}) {
	// Add authentication or other middleware logic here
	return <>{children}</>;
}
