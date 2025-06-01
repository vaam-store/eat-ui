import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function useRedirects() {
	const searchParams = useSearchParams();
	const redirectUrl = searchParams.get('redirect_url') || '/';
	const queryString = useMemo(() => {
		return searchParams.toString();
	}, [searchParams]);
	const nextQueryString = useMemo(() => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete('redirect_url');
		return params.toString();
	}, [searchParams]);

	return {
		redirectUrl,
		nextQueryString,
		queryString,
	};
}
