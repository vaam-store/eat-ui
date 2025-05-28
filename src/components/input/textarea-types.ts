/**
 * Textarea component type definitions
 */

// Textarea sizes
export type TextareaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Textarea colors (daisyUI palette)
export type TextareaColor =
	| 'primary'
	| 'secondary'
	| 'accent'
	| 'neutral'
	| 'info'
	| 'success'
	| 'warning'
	| 'error';

// Textarea variants (daisyUI supports 'ghost' and default)
export type TextareaVariant = 'default' | 'ghost';

// CSS class maps for different textarea properties
export type TextareaClassMap = {
	[key: string]: string;
};
