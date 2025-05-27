import type { TextareaColor, TextareaSize, TextareaVariant } from './textarea-types';

/**
 * Returns the appropriate textarea size class
 */
export function getTextareaSizeClasses(size: TextareaSize | string | undefined): string {
  if (!size) return '';
  switch (size) {
    case 'xs':
      return 'textarea-xs';
    case 'sm':
      return 'textarea-sm';
    case 'md':
      return 'textarea-md';
    case 'lg':
      return 'textarea-lg';
    case 'xl':
      return 'textarea-xl';
    default:
      return '';
  }
}

/**
 * Returns the appropriate textarea color class
 */
export function getTextareaColorClasses(color: TextareaColor | string): string | null {
  switch (color) {
    case 'primary':
      return 'textarea-primary';
    case 'secondary':
      return 'textarea-secondary';
    case 'accent':
      return 'textarea-accent';
    case 'neutral':
      return 'textarea-neutral';
    case 'info':
      return 'textarea-info';
    case 'success':
      return 'textarea-success';
    case 'warning':
      return 'textarea-warning';
    case 'error':
      return 'textarea-error';
    default:
      return null;
  }
}

/**
 * Returns the appropriate textarea variant class
 */
export function getTextareaVariantClasses(variant: TextareaVariant | string): string | null {
  switch (variant) {
    case 'ghost':
      return 'textarea-ghost';
    case 'default':
      return null;
    default:
      return null;
  }
}