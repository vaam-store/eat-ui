'use client';

import { FormikButton } from '@vaa/components/button';
import { Form, FormGroup } from '@vaa/components/form';
import { InputField } from '@vaa/components/input/input-field';
import { Text } from '@vaa/components/text/text';
import { useLogin, useRegister } from '@vaa/hooks/auth/auth';
import { useRedirects } from '@vaa/hooks/auth/utils';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const Schema = z.object({
	username: z.string(),
});

export function Register() {
	const { register } = useRegister();
	const { login } = useLogin();
	const router = useRouter();
	const { redirectUrl, nextQueryString, queryString } = useRedirects();

	return (
		<Formik
			className="flex flex-col items-center justify-center gap-2"
			onSubmit={async ({ username }, { resetForm }) => {
				await register(username);
				await login(username);
				resetForm();
				router.push(`${redirectUrl}?=${nextQueryString}`);
			}}
			validationSchema={toFormikValidationSchema(Schema)}
			initialValues={{ username: '' }}
		>
			<Form>
				<FormGroup>
					<InputField
						name="username"
						label="What is your name?"
						type="text"
						placeholder="Stephane? Type here"
					/>

					<Text className="label">
						<span>Already have an account?</span>
						<Link replace href={`/auth/login?${queryString}`} className="link">
							Login here
						</Link>
					</Text>
				</FormGroup>

				<FormikButton type="submit">Register</FormikButton>
			</Form>
		</Formik>
	);
}
