import type { TextColor, TextSize } from '@vaa/components/text/types';
import type {
	ComponentPropsWithoutRef,
	ElementType,
	PropsWithChildren,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { Text } from './text';

interface TitleOwnProps {
	size?: TextSize;
	color?: TextColor;
	heading?: boolean;
}

type TitleProps<As extends ElementType = 'h1'> = TitleOwnProps &
	ComponentPropsWithoutRef<As> & {
		as?: As;
	};

export function Title<As extends ElementType = 'h1'>({
	children,
	as,
	heading,
	size = heading ? '6xl' : 'xl',
	className,
	...props
}: PropsWithChildren<TitleProps<As>>) {
	const Component = as || 'h1';
	return (
		<Text
			as={Component}
			size={size}
			bold
			className={twMerge(heading && 'heading-title', 'font-chivo', className)}
			{...props}
		>
			{children}
		</Text>
	);
}
