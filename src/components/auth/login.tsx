'use client';

import { FormikButton } from '@vaa/components/button/button';
import { Form, FormGroup } from '@vaa/components/form';
import { InputField } from '@vaa/components/input/input-field';
import { useLogin } from '@vaa/hooks/auth';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const Schema = z.object({
	username: z.string().min(1, 'Username is required'),
});

export function Login() {
	const { login } = useLogin();
	const searchParams = useSearchParams();
	const router = useRouter();
	const initialUsername = searchParams.get('username') || '';
	const redirectUrl = searchParams.get('redirectUrl') || '/'; // Default to '/' if not provided

	return (
		<Formik
			className="flex flex-col items-center justify-center gap-2"
			onSubmit={async ({ username }) => {
				await login(username);
				router.push(redirectUrl); // Redirect to redirectUrl after login
			}}
			validationSchema={toFormikValidationSchema(Schema)}
			initialValues={{ username: initialUsername }}
		>
			<Form>
				<FormGroup>
					<InputField
						name="username"
						label="Username"
						type="text"
						placeholder="Enter your username"
					/>
					<p className="label">
						Don't have an account?{' '}
						<Link className="link" href="/auth/register">
							Register here
						</Link>
					</p>
				</FormGroup>

				<FormikButton type="submit">Login</FormikButton>
			</Form>
		</Formik>
	);
}
