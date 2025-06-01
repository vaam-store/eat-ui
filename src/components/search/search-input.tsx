'use client';

import { Button } from '@vaa/components/button';
import {
	type GeolocationState,
	useGeolocation,
} from '@vaa/hooks/use-geolocation';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { MapPin, Search } from 'react-feather';

export type SearchLocationParams = Pick<
	GeolocationState,
	'latitude' | 'longitude'
> &
	Record<'query', string>;

export interface SearchInputProps {
	initialValue?: string;
	placeholder?: string;
	checkLocationDelivery?: boolean;
	onSearch?: (query: string) => void;
	onClear?: () => void;
	onMapPin?: (data: SearchLocationParams) => void;
}

export function SearchInput({
	checkLocationDelivery,
	onSearch,
	onMapPin,
}: SearchInputProps) {
	const { latitude, longitude, isLoading, getLocation } = useGeolocation();
	const formik = useFormik({
		initialValues: {
			query: '',
		},
		onSubmit: (values) => {
			onSearch?.(values.query);
		},
	});

	useEffect(() => {
		if (isLoading) {
			return;
		}

		if (latitude !== null && longitude !== null) {
			onMapPin?.({
				latitude,
				longitude,
				query: formik.values.query,
			});
			return;
		}
	}, [latitude, longitude, isLoading, onMapPin, formik]);

	return (
		<form
			onSubmit={formik.handleSubmit}
			className="flex flex-col items-center justify-center gap-4"
		>
			<label className="input md:input-xl w-full bg-base-200">
				<Search className="opacity-20" />
				<input
					type="search"
					className="grow"
					name="query"
					placeholder="Type your search here..."
					onChange={formik.handleChange}
					value={formik.values.query}
				/>
				<Button
					loading={isLoading}
					shape="circle"
					variant="soft"
					type="button"
					className="btn-sm md:btn-md"
					onClick={() => getLocation()}
				>
					<MapPin />
				</Button>
			</label>

			{checkLocationDelivery && (
				<div className="flex flex-row gap-4 text-sm opacity-50">
					<MapPin className="size-4" />
					<span>Delivering to Bangangté</span>
				</div>
			)}
		</form>
	);
}
