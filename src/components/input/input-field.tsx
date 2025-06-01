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
		<div className="form-control w-full">
			<label className="label" htmlFor={props.id || props.name}>
				<span className="label-text">{label}</span>
			</label>
			<input
				id={props.id || props.name}
				className={twMerge(
					'input input-xl w-full',
					colorClasses,
					sizeClasses,
					variantClasses,
					meta.touched && meta.error ? 'input-error' : '',
					className,
				)}
				{...field}
				{...props}
			/>
			{meta.touched && meta.error ? (
				<div className="label">
					<span className="label-text-alt text-error">{meta.error}</span>
				</div>
			) : null}
		</div>
	);
}
