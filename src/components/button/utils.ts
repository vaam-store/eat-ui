export function getButtonSizeClasses(size: string | undefined): string {
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

export function getButtonColorClasses(color: string): string | null {
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

export function getButtonVariantClasses(variant: string): string | null {
	switch (variant) {
		case 'outline':
			return 'btn-outline';
		case 'fill':
			return 'btn';
		case 'soft':
			return 'btn-soft';
		default:
			return null;
	}
}

/**
 * Returns the appropriate loading size class based on button size
 */
export function getLoadingSizeClasses(size: string | undefined): string {
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
export function getIconSize(size: string | undefined): number {
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
