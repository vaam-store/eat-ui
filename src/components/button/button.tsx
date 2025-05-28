import { useFormikContext } from 'formik';
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { X } from 'react-feather';
import { twMerge } from 'tailwind-merge';
import type { ButtonColor, ButtonSize, ButtonVariant } from './types';
import {
	getButtonColorClasses,
	getButtonSizeClasses,
	getButtonVariantClasses,
	getIconSize,
	getLoadingSizeClasses,
} from './utils';

interface BaseButtonOwnProps {
	loading?: boolean;
	size?: ButtonSize;
	color?: ButtonColor;
	variant?: ButtonVariant;
	circle?: boolean;
	block?: boolean;
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
	circle = false,
	block = false,
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
		<Component
			className={twMerge(
				'btn relative',
				variantClasses,
				colorClasses,
				sizeClasses,
				isDisabled && 'btn-disabled',
				circle && 'btn-circle',
				block && 'w-full',
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
