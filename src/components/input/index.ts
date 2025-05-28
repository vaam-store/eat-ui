/**
 * Input component exports
 */

// Export component
export { InputField } from './input-field';

// Export types
export type { InputSize, InputColor, InputVariant } from './types';

// Export utility functions
export {
	getInputSizeClasses,
	getInputColorClasses,
	getInputVariantClasses,
} from './utils';
/**
 * Textarea component exports
 */
export { TextareaField } from './textarea-field';
export type {
	TextareaSize,
	TextareaColor,
	TextareaVariant,
} from './textarea-types';
export {
	getTextareaSizeClasses,
	getTextareaColorClasses,
	getTextareaVariantClasses,
} from './textarea-utils';
