'use client';

import { Register } from '@vaa/components/auth/register';
import { ModalAuthPageWrapper } from '@vaa/components/modal';

export default function ModalRegisterPage() {
	return (
		<ModalAuthPageWrapper title="Register">
			<Register />
		</ModalAuthPageWrapper>
	);
}
