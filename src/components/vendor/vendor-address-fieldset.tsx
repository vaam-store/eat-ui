'use client';

import { Button } from '@vaa/components/button';
import { InputField } from '@vaa/components/input/input-field';
import { Text } from '@vaa/components/text/text';
import { useGeolocation } from '@vaa/hooks/use-geolocation';
import type { VendorAddress } from '@vaa/types/vendor';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { Delete, MapPin } from 'react-feather';

type VendorAddressFieldsetProps = {
	index: number;
	onRemove: (index: number) => void;
};

export function VendorAddressFieldset({
	index,
	onRemove,
}: VendorAddressFieldsetProps) {
	const { values, setFieldValue } = useFormikContext<{
		addresses: VendorAddress[];
	}>();
	const { latitude, longitude, isLoading, error, getLocation } =
		useGeolocation();

	useEffect(() => {
		if (latitude !== null && longitude !== null) {
			setFieldValue(`addresses[${index}].latitude`, latitude);
			setFieldValue(`addresses[${index}].longitude`, longitude);
		}
	}, [latitude, longitude, index, setFieldValue]);

	const handleGetLocation = () => {
		getLocation();
	};

	return (
		<fieldset>
			<legend className="fieldset-legend flex w-full flex-row items-center justify-between">
				<Text bold>Address {index + 1}</Text>

				<Button
					type="button"
					color="error"
					variant="soft"
					shape="circle"
					className="float-right"
					onClick={() => onRemove(index)}
				>
					<Delete />
				</Button>
			</legend>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<InputField
					name={`addresses[${index}].streetAddressLine1`}
					label="Street Address Line 1"
					placeholder="123 Main St"
					type="text"
				/>
				<InputField
					name={`addresses[${index}].streetAddressLine2`}
					label="Street Address Line 2 (Optional)"
					placeholder="Apt 4B"
					type="text"
				/>
				<InputField
					name={`addresses[${index}].city`}
					label="City"
					placeholder="New York"
					type="text"
					required
				/>
				<InputField
					name={`addresses[${index}].stateProvince`}
					label="State/Province"
					placeholder="NY"
					type="text"
					required
				/>
				<InputField
					name={`addresses[${index}].postalCode`}
					label="Postal Code"
					placeholder="10001"
					type="text"
					required
				/>
				<InputField
					name={`addresses[${index}].country`}
					label="Country"
					placeholder="USA"
					type="text"
					required
				/>
				<div className="col-span-full">
					<div className="label">
						<span className="label-text">GPS Coordinates</span>
					</div>
					<div className="join w-full">
						<InputField
							name={`addresses[${index}].latitude`}
							placeholder="Latitude"
							type="number"
							step="any"
							className="join-item input input-xl w-1/2"
							required
							disabled={isLoading}
							readOnly
							simple
						/>
						<InputField
							name={`addresses[${index}].longitude`}
							placeholder="Longitude"
							type="number"
							step="any"
							className="join-item input input-xl w-1/2"
							required
							disabled={isLoading}
							readOnly
							simple
						/>
						<Button
							type="button"
							color="primary"
							size="xl"
							className="join-item"
							onClick={handleGetLocation}
							loading={isLoading}
							disabled={isLoading}
						>
							<MapPin />
						</Button>
					</div>
					{error && <p className="label text-error">{error.message}</p>}
				</div>
			</div>
		</fieldset>
	);
}
