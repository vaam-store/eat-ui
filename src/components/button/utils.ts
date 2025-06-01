import type {
	ButtonColor,
	ButtonShape,
	ButtonSize,
	ButtonVariant,
} from './types';

/**
 * Returns the appropriate button size class
 */
export function getButtonSizeClasses(
	size: ButtonSize | string | undefined,
): string {
	if (!size) return '';

	switch (size) {
		case 'xs':
			return 'btn-xs';
		case 'sm':
			return 'btn-sm';
		case 'md':
			return 'btn-md';
		case 'lg':
			return 'btn-lg';
		case 'xl':
			return 'btn-xl';
		default:
			return '';
	}
}

/**
 * Returns the appropriate button color class
 */
export function getButtonColorClasses(
	color: ButtonColor | string,
): string | null {
	switch (color) {
		case 'primary':
			return 'btn-primary';
		case 'secondary':
			return 'btn-secondary';
		case 'accent':
			return 'btn-accent';
		case 'neutral':
			return 'btn-neutral';
		case 'info':
			return 'btn-info';
		case 'success':
			return 'btn-success';
		case 'warning':
			return 'btn-warning';
		case 'error':
			return 'btn-error';
		default:
			return null;
	}
}

/**
 * Returns the appropriate button variant class
 */
export function getButtonVariantClasses(
	variant: ButtonVariant | string,
): string | null {
	switch (variant) {
		case 'outline':
			return 'btn-outline';
		case 'fill':
			return '';
		case 'soft':
			return 'btn-soft';
		case 'ghost':
			return 'btn-ghost';
		case 'link':
			return 'btn-link';
		case 'dash':
			return 'btn-dash';
		default:
			return null;
	}
}

/**
 * Returns the appropriate loading size class based on button size
 */
export function getLoadingSizeClasses(
	size: ButtonSize | string | undefined,
): string {
	if (!size) return 'loading-md';

	switch (size) {
		case 'xs':
			return 'loading-xs';
		case 'sm':
			return 'loading-sm';
		case 'md':
			return 'loading-md';
		case 'lg':
			return 'loading-lg';
		case 'xl':
			return 'loading-xl';
		default:
			return 'loading-md';
	}
}

/**
 * Returns the appropriate icon size based on button size
 */
export function getIconSize(size: ButtonSize | string | undefined): number {
	switch (size) {
		case 'xs':
			return 12;
		case 'sm':
			return 16;
		case 'lg':
			return 24;
		case 'xl':
			return 28;
		default:
			return 20; // Default for 'md' or undefined
	}
}

/**
 * Returns the appropriate icon size based on button size
 */
export function getButtonShape(
	shape: ButtonShape | string | undefined,
): string | undefined {
	switch (shape) {
		case 'circle':
			return 'btn-circle';
		case 'square':
			return 'btn-square';
		default:
			return undefined;
	}
}
