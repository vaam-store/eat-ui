'use client';

import { useFormikContext } from 'formik';
import { twMerge } from 'tailwind-merge';

interface FormErrorProps {
	className?: string;
}

/**
 * FormError component to display form-level errors
 *
 * @example
 * <Form>
 *   <InputField name="email" label="Email" />
 *   <FormError />
 *   <FormikButton type="submit">Submit</FormikButton>
 * </Form>
 */
export function FormError({ className }: FormErrorProps) {
	const { errors, submitCount } = useFormikContext();

	// Get all form-level errors (not field-specific)
	const formErrors = typeof errors === 'string' ? errors : '';

	// Only show errors after form submission attempt
	if (!formErrors || submitCount === 0) {
		return null;
	}

	return (
		<div className={twMerge('mt-1 text-error text-sm', className)}>
			{formErrors}
		</div>
	);
}
