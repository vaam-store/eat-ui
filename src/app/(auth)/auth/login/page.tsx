'use client';

import { Login } from '@vaa/components/auth/login';
import { AuthPageHeader } from '@vaa/components/auth/auth-page-header';

export default async function VerifyPage() {
	return (
		<div className="flex flex-col gap-4">
			<AuthPageHeader title="Wait" />
			<Login />
		</div>
	);
}
