import { useField } from 'formik';
import type { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	name: string; // Formik field name
}

export function InputField({ label, className, ...props }: InputProps) {
	const [field, meta] = useField(props.name);

	return (
		<fieldset className="fieldset w-full">
			<legend className="fieldset-legend">{label}</legend>
			<input
				className={twMerge('input w-full', className)}
				{...field}
				{...props}
			/>
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</fieldset>
	);
}
