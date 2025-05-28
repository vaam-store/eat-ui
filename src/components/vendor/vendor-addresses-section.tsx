'use client';

import { BaseButton } from '@vaa/components/button';
import type { VendorActivationForm, VendorAddress } from '@vaa/types/vendor';
import { FieldArray, useFormikContext } from 'formik';
import { Plus } from 'react-feather';
import { VendorAddressFieldset } from './vendor-address-fieldset';

export function VendorAddressesSection() {
	const { values } = useFormikContext<VendorActivationForm>();

	const initialAddress: VendorAddress = {
		id: crypto.randomUUID(), // Ensure initial address has an ID
		streetAddressLine1: '',
		streetAddressLine2: '',
		city: '',
		stateProvince: '',
		postalCode: '',
		country: '',
		latitude: 0,
		longitude: 0,
	};

	return (
		<div className="card mb-6 bg-base-100 p-6 shadow-xl">
			<div className="card-body">
				<h2 className="card-title mb-4 font-bold text-2xl">Vendor Addresses</h2>
				<p className="mb-6 text-base-content">
					Please provide at least one business address. You can add multiple
					addresses if needed.
				</p>

				<FieldArray name="addresses">
					{({ push, remove }) => (
						<div>
							{values.addresses.map((address, index) => (
								<div
									key={address.id || crypto.randomUUID()} // Use a stable key
								>
									<VendorAddressFieldset index={index} onRemove={remove} />
								</div>
							))}
							<BaseButton // Corrected component name
								type="button"
								variant="outline"
								color="primary"
								className="mt-4"
								onClick={() =>
									push({ ...initialAddress, id: crypto.randomUUID() })
								} // Add a unique ID
							>
								<Plus size={20} />
								Add New Address
							</BaseButton>
						</div>
					)}
				</FieldArray>
			</div>
		</div>
	);
}
