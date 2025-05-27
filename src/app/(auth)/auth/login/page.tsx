import { AuthPageHeader } from '@vaa/components/auth/auth-page-header';
import { Login } from '@vaa/components/auth/login';

export default async function VerifyPage() {
	return (
		<div className="flex flex-col gap-4">
			<AuthPageHeader title="Wait" />
			<Login />
		</div>
	);
}
