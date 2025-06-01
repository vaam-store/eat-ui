import type { TextColor, TextSize } from '@vaa/components/text/types';

export function getTextColorClasses(color?: TextColor): string | null {
	switch (color) {
		case 'primary':
			return 'text-primary';
		case 'secondary':
			return 'text-secondary';
		case 'accent':
			return 'text-accent';
		case 'neutral':
			return 'text-neutral';
		case 'info':
			return 'text-info';
		case 'success':
			return 'text-success';
		case 'warning':
			return 'text-warning';
		case 'error':
			return 'text-error';
		default:
			return null;
	}
}

export function getTextSizeClasses(size?: TextSize): string {
	if (!size) return 'text-md';

	switch (size) {
		case 'xs':
			return 'text-xs';
		case 'sm':
			return 'text-sm';
		case 'md':
			return 'text-md';
		case 'lg':
			return 'text-lg';
		case 'xl':
			return 'text-xl';
		case '2xl':
			return 'text-xl lg:text-2xl';
		case '3xl':
			return 'text-xl md:text-2xl lg:text-3xl';
		case '4xl':
			return 'text-xl sm:text-2xl md:text-3xl lg:text-4xl';
		case '5xl':
			return 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl';
		case '6xl':
			return 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl';
		default:
			return 'text-md';
	}
}
