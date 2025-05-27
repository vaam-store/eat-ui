import { ToggleTheme } from '@vaa/components/theme-toggle';
import Link from 'next/link';

const AuthHeader = () => {
	return (
		<div className="flex flex-row items-center justify-between gap-4">
			<Link href="/" className="text-bold uppercase tracking-wide">
				VAAM EAT
			</Link>
			<ToggleTheme />
		</div>
	);
};

export { AuthHeader };
