'use client';

import { InputField } from '@vaa/components/input/input-field';
import type { VendorContactInformation } from '@vaa/types/vendor';
import { useFormikContext } from 'formik';

export function VendorContactInfoSection() {
	const { values } = useFormikContext<{ contact: VendorContactInformation }>();

	return (
		<div className="card mb-6 bg-base-100 p-6 shadow-xl">
			<div className="card-body">
				<h2 className="card-title mb-4 font-bold text-2xl">
					Vendor Contact Information
				</h2>
				<p className="mb-6 text-base-content">
					Please confirm or update your contact details. These will be used for
					vendor-related communications.
				</p>
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
