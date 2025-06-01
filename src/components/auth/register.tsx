'use client';

import { FormikButton } from '@vaa/components/button';
import { Form, FormGroup } from '@vaa/components/form';
import { InputField } from '@vaa/components/input/input-field';
import { Text } from '@vaa/components/text/text';
import { useRegister } from '@vaa/hooks/auth';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const Schema = z.object({
	username: z.string(),
});

export function Register() {
	const { register } = useRegister();
	const router = useRouter();

	return (
		<Formik
			className="flex flex-col items-center justify-center gap-2"
			onSubmit={async ({ username }, { resetForm }) => {
				await register(username);
				resetForm();
				router.push(`/auth/login?username=${encodeURIComponent(username)}`);
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
					<Text className="label">We're using it to create your account</Text>
				</FormGroup>

				<FormikButton type="submit">Register</FormikButton>
			</Form>
		</Formik>
	);
}
