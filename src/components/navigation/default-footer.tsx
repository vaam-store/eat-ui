import { AppName } from '@vaa/components/app/name';
import { Button } from '@vaa/components/button';
import { Section } from '@vaa/components/section/section';
import Link from 'next/link';
import { Facebook, Youtube } from 'react-feather';

export function DefaultFooter() {
	return (
		<div className="bg-neutral text-neutral-content">
			<Section className="py-4">
				<footer className="footer sm:footer-horizontal items-center">
					<aside className="grid-flow-col items-center">
						<span className="font-bold uppercase">
							<AppName />
						</span>
						<p>Copyright © {new Date().getFullYear()} - All right reserved</p>
					</aside>
					<nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
						<Button as={Link} href="#" shape="circle" variant="soft">
							<Facebook />
						</Button>

						<Button as={Link} href="#" shape="circle" variant="soft">
							<Youtube />
						</Button>
					</nav>
				</footer>
			</Section>
		</div>
	);
}
