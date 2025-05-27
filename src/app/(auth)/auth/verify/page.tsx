import { Login } from '@vaa/components/auth/login';

export default async function VerifyPage() {
	return (
		<div className="flex flex-col gap-4">
			<header className="flex flex-col justify-center">
				<h1 className="text-2xl text-bold">Wait</h1>
			</header>

			<Login username="" />
		</div>
	);
}
