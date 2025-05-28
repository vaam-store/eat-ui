'use client';

import { Register } from '@vaa/components/auth/register';
import { Modal } from '@vaa/components/modal/modal';
import { useIsAuthenticated } from '@vaa/hooks/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RegisterModalPage() {
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
		<Modal title="Register" open onClose={() => router.back()}>
			<Register />
		</Modal>
	);
}
