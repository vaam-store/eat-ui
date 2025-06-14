'use client';

import { Button } from '@vaa/components/button/button';
import type { VendorActivationForm as VendorActivationFormType } from '@vaa/types/vendor';
import { Form, Formik } from 'formik';
import { useMemo } from 'react';
import { VendorAddressesSection } from './vendor-addresses-section';
import { VendorContactInfoSection } from './vendor-contact-info-section';
import {ArrowRight} from "react-feather";

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
			{({ isSubmitting, handleSubmit, values }) => (
				<Form onSubmit={handleSubmit}>
					<div className="space-y-6 pb-6">
						<VendorContactInfoSection />
						<VendorAddressesSection />

						<div className="flex justify-end">
							<Button type="submit" disabled={isSubmitting} color="primary">
								<span>Activate Vendor Profile</span>
								<ArrowRight />
							</Button>
						</div>

						<pre>
							{JSON.stringify(values, null, 4)}
						</pre>
					</div>
				</Form>
			)}
		</Formik>
	);
}
