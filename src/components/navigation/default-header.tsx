import { AppName } from '@vaa/components/app/name';
import { Button } from '@vaa/components/button';
import { Section } from '@vaa/components/section/section';
import { Text } from '@vaa/components/text/text';
import { ToggleTheme } from '@vaa/components/theme-toggle';
import Link from 'next/link';
import { LogIn, ShoppingCart } from 'react-feather';

export function DefaultHeader() {
	return (
		<div className="navbar sticky top-0 z-10 border-base-300 border-b-1 bg-base-200">
			<Section>
				<div className="navbar-start">
					<Text as={Link} href="/" bold className="heading-title text-xl">
						<AppName />
					</Text>
				</div>

				<div className="navbar-center" />

				<div className="navbar-end">
					<div className="flex flex-row items-center gap-4 align-middle">
						<ToggleTheme />
						<Button as={Link} href="/cart" variant="soft" shape="circle">
							<ShoppingCart />
						</Button>

						<Button
							as={Link}
							href="/auth/login"
							color="primary"
							className="hidden md:flex"
							shape="circle"
							variant="soft"
						>
							<LogIn />
						</Button>
					</div>
				</div>
			</Section>
		</div>
	);
}
