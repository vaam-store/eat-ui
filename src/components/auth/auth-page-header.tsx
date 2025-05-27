'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AuthPageHeaderProps {
	title: string;
}

export function AuthPageHeader({ title }: AuthPageHeaderProps) {
	const pathname = usePathname();
	const isLoginPage = pathname === '/auth/login';
	const isRegisterPage = pathname === '/auth/register';

	return (
		<header className="flex flex-col justify-center gap-4">
			<h1 className="font-bold text-2xl">{title}</h1>

			<div className="tabs tabs-boxed">
				<Link
					href="/auth/login"
					className={`tab ${isLoginPage ? 'tab-active' : ''}`}
				>
					Login
				</Link>
				<Link
					href="/auth/register"
					className={`tab ${isRegisterPage ? 'tab-active' : ''}`}
				>
					Register
				</Link>
			</div>
		</header>
	);
}
