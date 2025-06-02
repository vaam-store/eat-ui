import { AuthWrapper } from '@vaa/components/auth/auth-wrapper';
import type { ReactNode } from 'react';

export default function DashboardLayout({
	children,
}: {
	children: ReactNode;
}) {
	return <AuthWrapper>{children}</AuthWrapper>;
}
