'use client';

import { useRegister } from '@vaa/hooks/auth';
import { Field, Form, Formik } from 'formik';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const Schema = z.object({
	username: z.string(),
});

export function Register() {
	const { register, isPending } = useRegister();

	return (
		<Formik
			className="flex flex-col items-center justify-center gap-2"
			onSubmit={async ({ username }, { resetForm }) => {
				await register(username);
				resetForm();
			}}
			validationSchema={toFormikValidationSchema(Schema)}
			initialValues={{ username: '' }}
		>
			{({ isValid, touched }) => (
				<Form>
					<fieldset className="fieldset w-full">
						<legend className="fieldset-legend">What is your name?</legend>
						<Field
							name="username"
							type="text"
							className="input w-full"
							placeholder="Stephane? Type here"
						/>
						<p className="label">We're using it to create your account</p>
					</fieldset>

					<button
						type="submit"
						className={twMerge('btn btn-primary w-full', [
							!isValid && 'btn-disabled',
						])}
						disabled={!(touched.username && isValid)}
					>
						Login
					</button>
				</Form>
			)}
		</Formik>
	);
}
