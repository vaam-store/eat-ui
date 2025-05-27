import type { InputColor, InputSize, InputVariant } from './types';

/**
 * Returns the appropriate input size class
 */
export function getInputSizeClasses(size: InputSize | string | undefined): string {
  if (!size) return '';
  switch (size) {
    case 'xs':
      return 'input-xs';
    case 'sm':
      return 'input-sm';
    case 'md':
      return 'input-md';
    case 'lg':
      return 'input-lg';
    case 'xl':
      return 'input-xl';
    default:
      return '';
  }
}

/**
 * Returns the appropriate input color class
 */
export function getInputColorClasses(color: InputColor | string): string | null {
  switch (color) {
    case 'primary':
      return 'input-primary';
    case 'secondary':
      return 'input-secondary';
    case 'accent':
      return 'input-accent';
    case 'neutral':
      return 'input-neutral';
    case 'info':
      return 'input-info';
    case 'success':
      return 'input-success';
    case 'warning':
      return 'input-warning';
    case 'error':
      return 'input-error';
    default:
      return null;
  }
}

/**
 * Returns the appropriate input variant class
 */
export function getInputVariantClasses(variant: InputVariant | string): string | null {
  switch (variant) {
    case 'ghost':
      return 'input-ghost';
    case 'default':
      return null;
    default:
      return null;
  }
}