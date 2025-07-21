import { AuthWrapper } from '@vaa/components/auth/auth-wrapper';
import {PropsWithChildren, ReactNode} from 'react';

export default function DashboardLayout({
	children,
}: Readonly<PropsWithChildren>) {
	return <AuthWrapper>{children}</AuthWrapper>;
}
