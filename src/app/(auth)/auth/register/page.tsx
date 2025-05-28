import { AuthPageHeader } from '@vaa/components/auth/auth-page-header';
import { Register } from '@vaa/components/auth/register';

export default async function LoginPage() {
	return (
		<div className="form-control gap-6">
			<AuthPageHeader title="Create Account" />
			<Register />
		</div>
	);
}
