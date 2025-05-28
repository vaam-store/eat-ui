'use client';

import { Form as FormikForm, useFormikContext } from 'formik';
import type { FormikFormProps } from 'formik';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface FormProps extends Omit<FormikFormProps, 'children'> {
	children: ReactNode;
	className?: string;
}

/**
 * Custom Form component that wraps Formik's Form with additional styling
 *
 * @example
 * <Formik
 *   initialValues={{ name: '' }}
 *   onSubmit={handleSubmit}
 * >
 *   <Form className="custom-class">
 *     <InputField name="name" label="Name" />
 *     <FormikButton type="submit">Submit</FormikButton>
 *   </Form>
 * </Formik>
 */
export function Form({ children, className, ...props }: FormProps) {
	return (
		<FormikForm className={twMerge('form-control gap-4', className)} {...props}>
			{children}
		</FormikForm>
	);
}

/**
 * FormContainer component that provides a Formik context-aware wrapper
 * This is useful when you need to access Formik context values outside of the Form
 *
 * @example
 * <Formik
 *   initialValues={{ name: '' }}
 *   onSubmit={handleSubmit}
 * >
 *   {() => (
 *     <FormContainer>
 *       <InputField name="name" label="Name" />
 *       <FormikButton type="submit">Submit</FormikButton>
 *     </FormContainer>
 *   )}
 * </Formik>
 */
export function FormContainer({
	children,
	className,
}: { children: ReactNode; className?: string }) {
	const formik = useFormikContext();

	if (!formik) {
		throw new Error('FormContainer must be used within a Formik component');
	}

	return (
		<div className={twMerge('form-control gap-4', className)}>{children}</div>
	);
}
