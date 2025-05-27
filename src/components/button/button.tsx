import { useFormikContext } from 'formik';
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { X } from 'react-feather';
import { twMerge } from 'tailwind-merge';

interface BaseButtonOwnProps {
	loading?: boolean;
	size?: 'btn-xs' | 'btn-sm' | 'btn-md' | 'btn-lg' | 'btn-xl';
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
	...props
}: BaseButtonProps<As>) {
	const Component = as || 'button';
	const isDisabled = loading || disabled;

	// Determine if the rendered component is a button to apply the native disabled attribute
	const isButton = Component === 'button';

	return (
		<div className="relative w-full">
			{loading && (
				<div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
					<div className='absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-primary' />
				</div>
			)}
			<Component
				className={twMerge(
					'btn btn-primary relative w-full',
					size,
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
							size ? size.replace('btn-', 'loading-') : '',
						)}
					/>
				) : isDisabled && isButton ? ( // Only show X icon if disabled and it's a button
					<X
						size={
							size === 'btn-xs'
								? 12
								: size === 'btn-sm'
									? 16
									: size === 'btn-lg'
										? 24
										: size === 'btn-xl'
											? 28
											: 20
						}
					/>
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
			type={type} // Pass type explicitly for button element
			{...props}
		/>
	);
}
