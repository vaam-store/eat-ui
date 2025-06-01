import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { X } from 'react-feather';
import { twMerge } from 'tailwind-merge';
import type {
	ButtonColor,
	ButtonShape,
	ButtonSize,
	ButtonVariant,
} from './types';
import {
	getButtonColorClasses,
	getButtonShape,
	getButtonSizeClasses,
	getButtonVariantClasses,
	getIconSize,
	getLoadingSizeClasses,
} from './utils';

interface BaseButtonOwnProps {
	loading?: boolean;
	size?: ButtonSize;
	shape?: ButtonShape;
	color?: ButtonColor;
	variant?: ButtonVariant;
	block?: boolean;
	disabled?: boolean;
}

type BaseButtonProps<As extends ElementType = 'button'> = BaseButtonOwnProps &
	ComponentPropsWithoutRef<As> & {
		as?: As;
	};

export function Button<As extends ElementType = 'button'>({
	className,
	loading = false,
	children,
	disabled,
	size,
	as,
	shape,
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
	const shapeClasses = getButtonShape(shape);

	return (
		<Component
			className={twMerge(
				'btn relative',
				variantClasses,
				colorClasses,
				sizeClasses,
				shapeClasses,
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
				<X className="fill-current" size={getIconSize(size)} />
			) : (
				children
			)}
		</Component>
	);
}
