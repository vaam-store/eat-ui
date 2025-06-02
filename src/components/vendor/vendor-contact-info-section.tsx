'use client';

import { InputField } from '@vaa/components/input/input-field';
import { Text } from '@vaa/components/text/text';
import { Title } from '@vaa/components/text/title';
import type { VendorContactInformation } from '@vaa/types/vendor';
import { useFormikContext } from 'formik';

export function VendorContactInfoSection() {
	const { values } = useFormikContext<{ contact: VendorContactInformation }>();

	return (
		<div className="card bg-base-200">
			<div className="card-body">
				<Title className="card-title">Vendor Contact Information</Title>
				<Text className="mb-6 text-base-content">
					Please confirm or update your contact details. These will be used for
					vendor-related communications.
				</Text>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<InputField
						name="contact.firstName"
						label="First Name"
						placeholder="John"
						type="text"
						required
					/>
					<InputField
						name="contact.lastName"
						label="Last Name"
						placeholder="Doe"
						type="text"
						required
					/>
					<InputField
						name="contact.email"
						label="Email"
						placeholder="john.doe@example.com"
						type="email"
						required
					/>
				</div>
			</div>
		</div>
	);
}
