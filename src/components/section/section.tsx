import type {
	ComponentPropsWithoutRef,
	ElementType,
	PropsWithChildren,
} from 'react';
import { twMerge } from 'tailwind-merge';

type SectionOwnProps = {};

type SectionProps<As extends ElementType = 'section'> = SectionOwnProps &
	ComponentPropsWithoutRef<As> & {
		as?: As;
	};

export function Section<As extends ElementType = 'section'>({
	as,
	children,
	className,
	...props
}: PropsWithChildren<SectionProps<As>>) {
	const Component = as || 'section';
	return (
		<Component className={twMerge('simple-container', className)} {...props}>
			{children}
		</Component>
	);
}
