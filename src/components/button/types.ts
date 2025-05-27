/**
 * Button component type definitions
 */

// Button sizes
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Button colors
export type ButtonColor = 
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

// Button variants
export type ButtonVariant = 'outline' | 'fill' | 'soft';

// Icon sizes mapped to button sizes
export type IconSizeMap = {
  [key in ButtonSize]: number;
};

// CSS class maps for different button properties
export type ButtonClassMap = {
  [key: string]: string;
};