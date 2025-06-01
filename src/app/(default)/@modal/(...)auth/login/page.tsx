'use client';

import { Login } from '@vaa/components/auth/login';
import { ModalAuthPageWrapper } from '@vaa/components/modal';

export default function ModalLoginPage() {
	return (
		<ModalAuthPageWrapper title="Login">
			<Login />
		</ModalAuthPageWrapper>
	);
}
