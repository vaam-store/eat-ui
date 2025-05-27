import { useFormikContext } from 'formik';
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { X } from 'react-feather';
import { twMerge } from 'tailwind-merge';
import {
	getButtonColorClasses,
	getButtonSizeClasses,
	getButtonVariantClasses,
	getIconSize,
	getLoadingSizeClasses,
} from './utils';

interface BaseButtonOwnProps {
	loading?: boolean;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	color?: string;
	variant?: 'outline' | 'fill' | 'soft';
}

type BaseButtonProps<As extends ElementType = 'button'> = BaseButtonOwnProps &
	ComponentPropsWithoutRef<As> & {
		as?: As;
	};

export function BaseButton<As extends ElementType = 'button'>({
	className,
	loading = false,
	children,
	disabled,
	size,
	as,
	color = 'primary',
	variant = 'fill',
	...props
}: BaseButtonProps<As>) {
	const Component = as || 'button';
	const isDisabled = loading || disabled;

	// Determine if the rendered component is a button to apply the native disabled attribute
	const isButton = Component === 'button';

	const colorClasses = getButtonColorClasses(color);
	const variantClasses = getButtonVariantClasses(variant);
	const sizeClasses = getButtonSizeClasses(size ?? '');

	return (
		<div className="relative w-full">
			{loading && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-primary" />
				</div>
			)}
			<Component
				className={twMerge(
					'btn relative w-full',
					variantClasses,
					colorClasses,
					sizeClasses,
					isDisabled && 'btn-disabled',
					className,
				)}
				// Apply native disabled attribute only if it's a button
				{...(isButton ? { disabled: isDisabled } : {})}
				{...props}
			>
				{loading ? (
					<span
						className={twMerge(
							'loading loading-spinner',
							getLoadingSizeClasses(size),
						)}
					/>
				) : isDisabled && isButton ? ( // Only show X icon if disabled and it's a button
					<X size={getIconSize(size)} />
				) : (
					children
				)}
			</Component>
		</div>
	);
}

interface FormikButtonProps
	extends ComponentPropsWithoutRef<typeof BaseButton> {}

export function FormikButton({
	className,
	type = 'submit',
	size = 'xl',
	...props
}: FormikButtonProps) {
	const { isValid, isSubmitting } = useFormikContext();

	return (
		<BaseButton
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
