'use client';

import { Form, FormGroup } from '@vaa/components/form';
import { InputField } from '@vaa/components/input/input-field';
import { Text } from '@vaa/components/text/text';
import { useLogin } from '@vaa/hooks/auth/auth';
import { useRedirects } from '@vaa/hooks/auth/utils';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { FormikButton } from '../button';

const Schema = z.object({
	username: z.string().min(1, 'Username is required'),
});

export function Login() {
	const { login } = useLogin();
	const router = useRouter();
	const { redirectUrl, nextQueryString, queryString } = useRedirects();

	return (
		<Formik
			className="flex flex-col items-center justify-center gap-2"
			onSubmit={async ({ username }) => {
				await login(username);
				router.push(`${redirectUrl}?=${nextQueryString}`);
			}}
			validationSchema={toFormikValidationSchema(Schema)}
			initialValues={{ username: '' }}
		>
			<Form>
				<FormGroup>
					<InputField
						name="username"
						label="Username"
						type="text"
						placeholder="Enter your username"
					/>

					<Text className="label">
						<span>Don't have an account? </span>

						<Link
							replace
							href={`/auth/register?${queryString}`}
							className="link"
						>
							Register here
						</Link>
					</Text>
				</FormGroup>

				<FormikButton type="submit">Login</FormikButton>
			</Form>
		</Formik>
	);
}
