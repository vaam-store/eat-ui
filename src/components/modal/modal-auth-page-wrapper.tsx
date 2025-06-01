'use client';

import { Modal, type ModalProps } from '@vaa/components/modal/modal';
import { useIsAuthenticated } from '@vaa/hooks/auth';
import { useRouter } from 'next/navigation';
import { type PropsWithChildren, useEffect } from 'react';

export function ModalAuthPageWrapper({
	children,
	...restProps
}: PropsWithChildren<Omit<ModalProps, 'onCloseAction' | 'open' | 'children'>>) {
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
		<Modal {...restProps} open onCloseAction={() => router.back()}>
			{children}
		</Modal>
	);
}
