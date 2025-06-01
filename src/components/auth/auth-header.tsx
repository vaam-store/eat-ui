import { Button } from '@vaa/components/button';
import { ToggleTheme } from '@vaa/components/theme-toggle';
import Link from 'next/link';

const AuthHeader = () => {
	return (
		<div className="flex flex-row items-center justify-between gap-4">
			<Button
				as={Link}
				href="/"
				variant="ghost"
				className="text-xl normal-case"
			>
				VAAM EAT
			</Button>
			<ToggleTheme />
		</div>
	);
};

export { AuthHeader };
