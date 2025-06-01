import type { TextColor, TextSize } from '@vaa/components/text/types';
import {
	getTextColorClasses,
	getTextSizeClasses,
} from '@vaa/components/text/utils';
import type {
	ComponentPropsWithoutRef,
	ElementType,
	PropsWithChildren,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface TextOwnProps {
	size?: TextSize;
	color?: TextColor;
	bold?: boolean;
}

type TextProps<As extends ElementType = 'p'> = TextOwnProps &
	ComponentPropsWithoutRef<As> & {
		as?: As;
	};

export function Text<As extends ElementType = 'p'>({
	children,
	as,
	color,
	size,
	bold,
	className,
	...props
}: PropsWithChildren<TextProps<As>>) {
	const Component = as || 'p';
	const textColorClasses = getTextColorClasses(color);
	const textSizeClasses = getTextSizeClasses(size);

	const finalClass = twMerge(
		'text-wrap',
		bold && 'font-bold',
		textColorClasses,
		textSizeClasses,
		className,
	);

	return (
		<Component className={finalClass} {...props}>
			{children}
		</Component>
	);
}
