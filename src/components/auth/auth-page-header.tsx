'use client';

import { Title } from '@vaa/components/text/title';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

interface AuthPageHeaderProps {
	title: string;
}

export function AuthPageHeader({ title }: AuthPageHeaderProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const isLoginPage = pathname === '/auth/login';
	const isRegisterPage = pathname === '/auth/register';

	const queryString = useMemo(() => {
		return searchParams.toString();
	}, [searchParams]);

	return (
		<header className="flex flex-col justify-center gap-4">
			<Title>{title}</Title>

			<div className="tabs tabs-boxed">
				<Link
					replace
					href={`/auth/login?${queryString}`}
					className={twMerge('tab', isLoginPage && 'tab-active')}
				>
					Login
				</Link>
				<Link
					replace
					href={`/auth/register?${queryString}`}
					className={twMerge('tab', isRegisterPage && 'tab-active')}
				>
					Register
				</Link>
			</div>
		</header>
	);
}
