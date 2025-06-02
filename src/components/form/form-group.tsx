import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface FormGroupProps {
	children: ReactNode;
	className?: string;
}

/**
 * FormGroup component for grouping form elements with consistent spacing
 *
 * @example
 * <Form>
 *   <FormGroup>
 *     <InputField name="firstName" label="First Name" />
 *     <InputField name="lastName" label="Last Name" />
 *   </FormGroup>
 *   <FormikButton type="submit">Submit</FormikButton>
 * </Form>
 */
export function FormGroup({ children, className }: FormGroupProps) {
	return (
		<div className={twMerge('flex flex-col gap-4', className)}>{children}</div>
	);
}
