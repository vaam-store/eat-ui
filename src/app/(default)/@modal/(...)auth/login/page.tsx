'use client';

import { Login } from '@vaa/components/auth/login';
import { Modal } from '@vaa/components/modal/modal';
import { useIsAuthenticated } from '@vaa/hooks/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginModalPage() {
	const router = useRouter();
	const { data, isPending } = useIsAuthenticated();

	useEffect(() => {
		if (isPending) {
			return;
		}

		if (data) {
			router.back();
		}
	}, [data, router, isPending]);

	if (isPending) {
		return null;
	}

	return (
		<Modal title="Login" open onClose={() => router.back()}>
			<Login />
		</Modal>
	);
}
