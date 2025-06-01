'use client';

import { Modal, type ModalProps } from '@vaa/components/modal/modal';
import { useRouter } from 'next/navigation';
import type { PropsWithChildren } from 'react';

export function ModalPageWrapper({
	children,
	...restProps
}: PropsWithChildren<Omit<ModalProps, 'onCloseAction' | 'open' | 'children'>>) {
	const router = useRouter();
	return (
		<Modal {...restProps} open onCloseAction={() => router.back()}>
			{children}
		</Modal>
	);
}
