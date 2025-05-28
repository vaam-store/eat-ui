import { BaseButton } from '@vaa/components/button';
import { ToggleTheme } from '@vaa/components/theme-toggle';
import Link from 'next/link';

export default function RootLayout({
	children,
	modal,
}: Readonly<{ children: React.ReactNode; modal?: React.ReactNode }>) {
	return (
		<main className="min-h-screen">
			<div className="navbar bg-base-100 shadow-sm">
				<div className="navbar-start">
					<BaseButton as={Link} href="/" variant="ghost" className="text-xl">
						VAAM
					</BaseButton>
				</div>
				<div className="navbar-end">
					<BaseButton
						as={Link}
						href="/auth/login"
						color="primary"
						className="mr-2"
					>
						Login
					</BaseButton>
					<ToggleTheme />
				</div>
			</div>

			<div className="container mx-auto p-4">{children}</div>
			<div id="modal">{modal}</div>
		</main>
	);
}
