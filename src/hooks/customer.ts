import { useQuery } from '@tanstack/react-query';
import { useMedusa } from '@vaa/medusa';
type Customer = {
	first_name: string | null;
	last_name: string | null;
	email: string;
};

type CustomerResponse = {
	customer: Customer;
};

export function useCustomerDetails() {
	const medusa = useMedusa();

	return useQuery({
		queryKey: ['customer-details'],
		queryFn: async () => {
			try {
				const { customer } = await medusa.client.fetch<CustomerResponse>(
					'/store/customers/me',
				);
				return customer;
			} catch (error) {
				console.error('Failed to fetch customer details:', error);
				throw new Error('Failed to fetch customer details');
			}
		},
		staleTime: 1000 * 60 * 5, // 5 minutes
		gcTime: 1000 * 60 * 10, // 10 minutes
	});
}
