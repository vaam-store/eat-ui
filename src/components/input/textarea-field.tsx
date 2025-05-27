import { useField } from 'formik';
import type { TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import type { TextareaColor, TextareaSize, TextareaVariant } from './textarea-types';
import {
  getTextareaColorClasses,
  getTextareaSizeClasses,
  getTextareaVariantClasses,
} from './textarea-utils';

export interface TextareaFieldProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label: string;
  name: string; // Formik field name
  color?: TextareaColor;
  size?: TextareaSize;
  variant?: TextareaVariant;
}

export function TextareaField({
  label,
  className,
  color = 'neutral',
  size = 'md',
  variant = 'default',
  ...props
}: TextareaFieldProps) {
  const [field, meta] = useField(props.name);

  const colorClasses = getTextareaColorClasses(color);
  const sizeClasses = getTextareaSizeClasses(size);
  const variantClasses = getTextareaVariantClasses(variant);

  return (
    <fieldset className="fieldset w-full">
      <legend className="fieldset-legend">{label}</legend>
      <textarea
        className={twMerge(
          'textarea w-full',
          colorClasses,
          sizeClasses,
          variantClasses,
          className,
        )}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <p className="label text-error">{meta.error}</p>
      ) : null}
    </fieldset>
  );
}