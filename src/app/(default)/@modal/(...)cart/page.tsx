import { ShoppingCart } from '@vaa/components/cart';
import { ModalPageWrapper } from '@vaa/components/modal';

export default function ModalCartPage() {
	return (
		<ModalPageWrapper title="Shopping Cart" position="right">
			<ShoppingCart />
		</ModalPageWrapper>
	);
}
