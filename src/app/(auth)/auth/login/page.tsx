import { AuthPageHeader } from '@vaa/components/auth/auth-page-header';
import { Login } from '@vaa/components/auth/login';

export default async function VerifyPage() {
	return (
		<div className="form-control gap-6">
			<AuthPageHeader title="Login" />
			<Login />
		</div>
	);
}
