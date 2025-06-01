'use client';

import { useIsAuthenticated } from '@vaa/hooks/auth/auth';
import { usePathname, useRouter } from 'next/navigation';
import { type PropsWithChildren, useEffect, useState } from 'react';

export function AuthWrapper({ children }: PropsWithChildren) {
	const router = useRouter();
	const pathname = usePathname();
	const [currentPathname] = useState(pathname);
	const { data, isPending } = useIsAuthenticated();

	useEffect(() => {
		if (isPending) {
			return;
		}

		if (!data) {
			router.replace(
				`/auth/login?redirect_url=${encodeURIComponent(currentPathname)}`,
			);
			return;
		}
	}, [data, router, currentPathname, isPending]);

	if (isPending) {
		return null;
	}

	if (!data) {
		return null;
	}

	return <>{children}</>;
}
