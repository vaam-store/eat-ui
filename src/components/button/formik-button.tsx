'use client';

import { useFormikContext } from 'formik';
import type { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './button';

interface FormikButtonProps extends ComponentPropsWithoutRef<typeof Button> {}

export function FormikButton({
	className,
	type = 'submit',
	size = 'xl',
	...props
}: FormikButtonProps) {
	const { isValid, isSubmitting } = useFormikContext();

	return (
		<Button
			as="button"
			className={twMerge(
				className,
				(!isValid || isSubmitting) && 'btn-disabled',
			)}
			disabled={!isValid || isSubmitting}
			loading={isSubmitting}
			type={type}
			size={size}
			{...props}
		/>
	);
}
