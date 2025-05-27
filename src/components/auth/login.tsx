'use client';

import { useLogin } from '@vaa/hooks/auth';
import { Field, Form, Formik } from 'formik';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useSearchParams } from 'next/navigation';

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
					<fieldset className="fieldset w-full">
						<legend className="fieldset-legend">Username</legend>
						<Field
							name="username"
							type="text"
							className="input w-full"
							placeholder="Enter your username"
						/>
					</fieldset>

					<button
						type="submit"
						className={twMerge('btn btn-primary w-full', [
							!isValid && 'btn-disabled',
						])}
						disabled={!isValid}
					>
						Login
					</button>
				</Form>
			)}
		</Formik>
	);
}
