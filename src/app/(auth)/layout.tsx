import { AuthContentWrapper } from '@vaa/components/auth/auth-content-wrapper';
import { AuthFooter } from '@vaa/components/auth/auth-footer';
import { AuthHeader } from '@vaa/components/auth/auth-header';
import { AuthSideSection } from '@vaa/components/auth/auth-side-section';

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex flex-row items-center justify-between gap-4 bg-base-100">
			<div className="hidden grow-7 flex-row items-center justify-center gap-4 md:flex">
				<AuthSideSection />
			</div>

			<div id="auth" className="flex min-h-screen grow-4 flex-row bg-base-200">
				<div className="flex min-h-screen w-full flex-col justify-between gap-4 bg-base-300 p-8 md:max-w-sm md:p-12">
					<div>
						<AuthHeader />
						<AuthContentWrapper>{children}</AuthContentWrapper>
					</div>
					<AuthFooter />
				</div>
				<AuthSideSection />
			</div>
		</div>
	);
}
