import { ToggleTheme } from '@vaa/components/theme-toggle';
import Link from 'next/link';

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex flex-row items-center justify-between gap-4 bg-base-100">
			<div className="hidden grow-7 flex-row items-center justify-center gap-4 md:flex">
				Side
			</div>

			<div id="auth" className="flex min-h-screen grow-4 flex-row bg-base-200">
				<div className="flex min-h-screen w-full flex-col justify-between gap-4 bg-base-300 p-8 md:max-w-sm md:p-12">
					<div>
						<div className="flex flex-row items-center justify-between gap-4">
							<Link href="/" className="text-bold uppercase tracking-wide">
								VAAM EAT
							</Link>

							<ToggleTheme />
						</div>

						<div id="content">{children}</div>
					</div>

					<footer>vaam.eat</footer>
				</div>

				<div className="hidden grow flex-row items-center justify-center gap-4 md:flex">
					Side again
				</div>
			</div>
		</div>
	);
}
