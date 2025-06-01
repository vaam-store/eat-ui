import { AuthWrapper } from '@vaa/components/auth/auth-wrapper';
import { UserOrder } from '@vaa/components/orders/order';
import { Suspense } from 'react';

export default function OrdersPage() {
	return (
		<Suspense>
			<AuthWrapper>
				<UserOrder />
			</AuthWrapper>
		</Suspense>
	);
}
