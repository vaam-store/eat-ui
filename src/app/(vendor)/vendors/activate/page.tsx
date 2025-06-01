'use client';

import { Section } from '@vaa/components/section/section';
import { VendorActivationForm } from '@vaa/components/vendor/vendor-activation-form';
import { useAskActivateVendor, useGetMyVendor } from '@vaa/hooks/vendor';
import type { VendorActivationForm as VendorActivationFormType } from '@vaa/types/vendor';
import { useEffect } from 'react';

export default function ActivateVendorAccountPage() {
	const {
		data: vendorAccount,
		isLoading: isVendorLoading,
		error: vendorError,
	} = useGetMyVendor();
	const {
		activate,
		isActivating,
		isSuccess,
		error: activationError,
	} = useAskActivateVendor();

	useEffect(() => {
		if (vendorAccount) {
			console.log('Vendor account status:', vendorAccount.status);
			// Potentially redirect or show a message if already active/pending
		}
	}, [vendorAccount]);

	const handleSubmit = async (values: VendorActivationFormType) => {
		console.log('Submitting vendor activation form:', values);
		// In a real scenario, you would pass these values to the activate mutation
		// For now, we're just calling the placeholder activate function
		activate();
	};

	if (isVendorLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<span className="loading loading-spinner loading-lg" />
			</div>
		);
	}

	if (vendorAccount && vendorAccount.status !== 'Rejected') {
		return (
			<Section>
				<div className="card bg-base-100 p-6 text-center shadow-xl">
					<h1 className="mb-4 font-bold text-3xl">Vendor Account Status</h1>
					<p className="text-lg">
						Your vendor account is currently{' '}
						<span className="font-semibold">{vendorAccount.status}</span>.
					</p>
					{vendorAccount.status === 'Pending Validation' && (
						<p className="mt-2 text-md">
							We are reviewing your application. You will be notified once it's
							validated.
						</p>
					)}
					{vendorAccount.status === 'Active' && (
						<p className="mt-2 text-md">
							Your vendor account is active! You can now manage your products
							and orders.
						</p>
					)}
				</div>
			</Section>
		);
	}

	return (
		<Section>
			<div className="mb-8 text-center">
				<h1 className="mb-2 font-bold text-4xl">
					Activate Your Vendor Account
				</h1>
				<p className="text-base-content text-lg">
					Become a vendor and start selling your products on our platform.
				</p>
			</div>
			<VendorActivationForm onSubmit={handleSubmit} />
			{activationError && (
				<div className="alert alert-error mt-4">
					<p>{activationError.message}</p>
				</div>
			)}
			{isSuccess && (
				<div className="alert alert-success mt-4">
					<p>
						Vendor activation request submitted successfully! Your account is
						now pending validation.
					</p>
				</div>
			)}
		</Section>
	);
}
