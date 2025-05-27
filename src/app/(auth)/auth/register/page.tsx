import { Register } from '@vaa/components/auth/register';
import { AuthPageHeader } from '@vaa/components/auth/auth-page-header';

export default async function LoginPage() {
	return (
		<div className="flex flex-col gap-4">
			<AuthPageHeader title="Create or Login!" />
			<Register />
		</div>
	);
}
