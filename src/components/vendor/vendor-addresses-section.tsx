'use client';

import { Button } from '@vaa/components/button';
import { Text } from '@vaa/components/text/text';
import { Title } from '@vaa/components/text/title';
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
		<div className="card bg-base-200">
			<div className="card-body">
				<Title className="card-title">Vendor Addresses</Title>
				<Text className="mb-6 text-base-content">
					Please provide at least one business address. You can add multiple
					addresses if needed.
				</Text>

				<FieldArray name="addresses">
					{({ push, remove }) => (
						<div>
							{values.addresses.map((address, index) => (
								<div
									className="mb-4 border-base-300 border-b-2 pb-4"
									key={address.id || crypto.randomUUID()}
								>
									<VendorAddressFieldset index={index} onRemove={remove} />
								</div>
							))}
							<Button
								type="button"
								variant="soft"
								color="primary"
								onClick={() =>
									push({ ...initialAddress, id: crypto.randomUUID() })
								}
							>
								<Plus />
								<span>Add New Address</span>
							</Button>
						</div>
					)}
				</FieldArray>
			</div>
		</div>
	);
}
