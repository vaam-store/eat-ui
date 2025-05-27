'use client';

import { FormikButton } from '@vaa/components/button/button';
import { InputField } from '@vaa/components/input/input-field';
import { useLogin } from '@vaa/hooks/auth';
import { Form, Formik } from 'formik';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const Schema = z.object({
	username: z.string().min(1, 'Username is required'),
});

export function Login() {
	const { login, isPending } = useLogin();
	const searchParams = useSearchParams();
	const initialUsername = searchParams.get('username') || '';

	return (
		<Formik
			className="flex flex-col items-center justify-center gap-2"
			onSubmit={async ({ username }) => {
				await login(username);
			}}
			validationSchema={toFormikValidationSchema(Schema)}
			initialValues={{ username: initialUsername }}
		>
			{({ isValid, touched }) => (
				<Form>
					<InputField
						name="username"
						label="Username"
						type="text"
						placeholder="Enter your username"
					/>

					<FormikButton type="submit">Login</FormikButton>
				</Form>
			)}
		</Formik>
	);
}
