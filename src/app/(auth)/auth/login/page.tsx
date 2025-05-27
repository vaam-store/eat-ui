import { Register } from '@vaa/components/auth/register';

export default async function LoginPage() {
	return (
		<div className="flex flex-col gap-4">
			<header className="flex flex-col justify-center">
				<h1 className="text-2xl text-bold">Create or Login!</h1>
			</header>

			<Register />
		</div>
	);
}
