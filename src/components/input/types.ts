/**
 * Input component type definitions
 */

// Input sizes
export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Input colors (daisyUI palette)
export type InputColor =
	| 'primary'
	| 'secondary'
	| 'accent'
	| 'neutral'
	| 'info'
	| 'success'
	| 'warning'
	| 'error';

// Input variants (daisyUI supports 'ghost' and default)
export type InputVariant = 'default' | 'ghost';

// CSS class maps for different input properties
export type InputClassMap = {
	[key: string]: string;
};
