'use client';

import { BaseButton } from '@vaa/components/button/button';
import type { VendorActivationForm as VendorActivationFormType } from '@vaa/types/vendor';
import { Form, Formik } from 'formik';
import { useMemo } from 'react';
import { VendorAddressesSection } from './vendor-addresses-section';
import { VendorContactInfoSection } from './vendor-contact-info-section';

export function VendorActivationForm({
	onSubmit,
	initialValues,
}: {
	onSubmit: (values: VendorActivationFormType) => Promise<void>;
	initialValues?: Partial<VendorActivationFormType>;
}) {
	const defaultInitialValues: VendorActivationFormType = useMemo(
		() => ({
			contact: {
				firstName: '',
				lastName: '',
				email: '',
			},
			addresses: [
				{
					streetAddressLine1: '',
					city: '',
					stateProvince: '',
					postalCode: '',
					country: '',
					latitude: 0, // Add default latitude
					longitude: 0, // Add default longitude
				},
			],
		}),
		[],
	);

	return (
		<Formik
			initialValues={{
				...defaultInitialValues,
				...initialValues,
			}}
			onSubmit={async (values, { setSubmitting }) => {
				try {
					await onSubmit(values);
				} finally {
					setSubmitting(false);
				}
			}}
		>
			{({ isSubmitting, handleSubmit }) => (
				<Form onSubmit={handleSubmit}>
					<div className="space-y-6">
						<VendorContactInfoSection />
						<VendorAddressesSection />

						<div className="flex justify-end">
							<BaseButton type="submit" disabled={isSubmitting} color="primary">
								{isSubmitting ? 'Submitting...' : 'Activate Vendor Profile'}
							</BaseButton>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
}
