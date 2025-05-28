import type { VendorAccount } from '@vaa/types/vendor';
import { useCallback } from 'react';

export function useGetMyVendor() {
	return {
		data: undefined as VendorAccount | undefined,
		isLoading: false,
		error: undefined as Error | undefined,
	};
}

export function useAskActivateVendor() {
	const activate = useCallback(() => {
		throw Error('todo');
	}, []);

	return {
		activate,
		isActivating: false,
		error: undefined as Error | undefined,
		isSuccess: false,
	};
}
