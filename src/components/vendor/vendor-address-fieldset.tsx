'use client';

import { Button } from '@vaa/components/button';
import { InputField } from '@vaa/components/input/input-field';
import { useGeolocation } from '@vaa/hooks/use-geolocation';
import type { VendorAddress } from '@vaa/types/vendor';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { X } from 'react-feather';

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
		<fieldset className="fieldset mb-4">
			<legend className="fieldset-legend">
				Address {index + 1}
				<Button
					type="button"
					variant="ghost"
					size="sm"
					className="float-right"
					onClick={() => onRemove(index)}
				>
					<X size={16} />
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
							id={`latitude-${index}`}
							name={`addresses[${index}].latitude`}
							label="Latitude"
							placeholder="Latitude"
							type="number"
							step="any"
							className="join-item w-1/2"
							required
							disabled={isLoading}
						/>
						<InputField
							id={`longitude-${index}`}
							name={`addresses[${index}].longitude`}
							label="Longitude"
							placeholder="Longitude"
							type="number"
							step="any"
							className="join-item w-1/2"
							required
							disabled={isLoading}
						/>
						<Button
							type="button"
							color="primary"
							className="join-item"
							onClick={handleGetLocation}
							loading={isLoading}
							disabled={isLoading}
						>
							{isLoading ? 'Getting Location...' : 'Get My Location'}
						</Button>
					</div>
					{error && <p className="label text-error">{error.message}</p>}
				</div>
			</div>
		</fieldset>
	);
}
