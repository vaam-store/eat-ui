'use client';

import { useCallback, useEffect, useState } from 'react';

type GeolocationState = {
	latitude: number | null;
	longitude: number | null;
	error: Error | null;
	isLoading: boolean;
};

export function useGeolocation() {
	const [state, setState] = useState<GeolocationState>({
		latitude: null,
		longitude: null,
		error: null,
		isLoading: true,
	});

	const getLocation = useCallback(() => {
		if (!navigator.geolocation) {
			setState((prevState) => ({
				...prevState,
				error: new Error('Geolocation is not supported by your browser'),
				isLoading: false,
			}));
			return;
		}

		setState((prevState) => ({ ...prevState, isLoading: true, error: null }));

		navigator.geolocation.getCurrentPosition(
			(position) => {
				setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					error: null,
					isLoading: false,
				});
			},
			(err: GeolocationPositionError) => {
				setState((prevState) => ({
					...prevState,
					error: new Error(err.message),
					isLoading: false,
				}));
			},
			{
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0,
			},
		);
	}, []);

	useEffect(() => {
		getLocation();
	}, [getLocation]);

	return { ...state, getLocation };
}
