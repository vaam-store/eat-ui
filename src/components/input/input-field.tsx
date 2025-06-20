import { useField } from 'formik';
import type { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import type { InputColor, InputSize, InputVariant } from './types';
import {
	getInputColorClasses,
	getInputSizeClasses,
	getInputVariantClasses,
} from './utils';

export type InputFieldProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'size'
> & {
	label?: string;
	name: string;
	color?: InputColor;
	size?: InputSize;
	variant?: InputVariant;
	simple?: boolean;
};

export function InputField({
	label,
	className,
	color = 'neutral',
	size = 'xl',
	variant = 'default',
	simple = false,
	...props
}: InputFieldProps) {
	const [field, meta] = useField(props.name);

	const colorClasses = getInputColorClasses(color);
	const sizeClasses = getInputSizeClasses(size);
	const variantClasses = getInputVariantClasses(variant);

	if (simple) {
		return (
			<input
				id={props.id || props.name}
				className={twMerge(
					'input w-full',
					colorClasses,
					sizeClasses,
					variantClasses,
					meta.touched && meta.error ? 'input-error' : '',
					className,
				)}
				{...field}
				{...props}
			/>
		);
	}

	return (
		<div className="form-control w-full">
			<label className="label" htmlFor={props.id || props.name}>
				<span className="label-text">{label}</span>
			</label>
			<input
				id={props.id || props.name}
				className={twMerge(
					'input w-full',
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
