import { useField } from 'formik';
import type { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import type { InputColor, InputSize, InputVariant } from './types';
import {
	getInputColorClasses,
	getInputSizeClasses,
	getInputVariantClasses,
} from './utils';

export interface InputFieldProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
	label: string;
	name: string; // Formik field name
	color?: InputColor;
	size?: InputSize;
	variant?: InputVariant;
}

export function InputField({
	label,
	className,
	color = 'neutral',
	size = 'md',
	variant = 'default',
	...props
}: InputFieldProps) {
	const [field, meta] = useField(props.name);

	const colorClasses = getInputColorClasses(color);
	const sizeClasses = getInputSizeClasses(size);
	const variantClasses = getInputVariantClasses(variant);

	return (
		<fieldset className="fieldset w-full">
			<legend className="fieldset-legend">{label}</legend>
			<input
				className={twMerge(
					'input w-full',
					colorClasses,
					sizeClasses,
					variantClasses,
					className,
				)}
				{...field}
				{...props}
			/>
			{meta.touched && meta.error ? (
				<p className="label text-error">{meta.error}</p>
			) : null}
		</fieldset>
	);
}
