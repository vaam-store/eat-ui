'use client';

import { FormikButton } from '@vaa/components/button/button';
import { InputField } from '@vaa/components/input/input-field';
import { useRegister } from '@vaa/hooks/auth';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const Schema = z.object({
	username: z.string(),
});

export function Register() {
	const { register, isPending } = useRegister();
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
			{({ isValid, touched }) => (
				<Form>
					<InputField
						name="username"
						label="What is your name?"
						type="text"
						placeholder="Stephane? Type here"
					/>
					<p className="label">We're using it to create your account</p>

					<FormikButton type="submit">Login</FormikButton>
				</Form>
			)}
		</Formik>
	);
}
