import { ToggleTheme } from '@vaa/components/theme-toggle';
import Link from 'next/link';

export default function RootLayout({
	children,
	modal,
}: Readonly<{ children: React.ReactNode; modal?: React.ReactNode }>) {
	return (
		<main>
			<div className="container mx-auto hidden p-4 md:block">
				<nav className="flex flex-row items-center justify-between gap-4">
					<Link className="btn btn-primary" href="/auth/login">
						Login
					</Link>

					<ToggleTheme />
				</nav>
			</div>

			<div id="welcome">{children}</div>
			<div id="modal">{modal}</div>
		</main>
	);
}
