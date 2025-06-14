import {useField} from 'formik';
import type {SelectHTMLAttributes} from 'react';
import {twMerge} from 'tailwind-merge';
import type {InputColor, InputSize, InputVariant} from './types';
import {
    getInputVariantClasses,
    getSelectColorClasses,
    getSelectSizeClasses,
} from './utils';

export type SelectFieldProps = Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    'size'
> & {
    label?: string;
    name: string;
    color?: InputColor;
    size?: InputSize;
    variant?: InputVariant;
    simple?: boolean;
};

export function SelectField({
                                label,
                                className,
                                color = 'neutral',
                                size = 'xl',
                                variant = 'default',
                                simple = false,
                                ...props
                            }: SelectFieldProps) {
    const [field, meta] = useField(props.name);

    const colorClasses = getSelectColorClasses(color);
    const sizeClasses = getSelectSizeClasses(size);
    const variantClasses = getInputVariantClasses(variant);

    if (simple) {
        return (
            <select
                id={props.id || props.name}
                className={twMerge(
                    'select w-full',
                    colorClasses,
                    sizeClasses,
                    variantClasses,
                    meta.touched && meta.error ? 'select-error' : '',
                    className,
                )}
                {...field}
                {...props}
            />
        );
    }

    return (
        <div className="form-control w-full">
            <label className="label" htmlFor={props.id || props.name}>
                <span className="label-text">{label}</span>
            </label>
            <select
                id={props.id || props.name}
                className={twMerge(
                    'select w-full',
                    colorClasses,
                    sizeClasses,
                    variantClasses,
                    meta.touched && meta.error ? 'select-error' : '',
                    className,
                )}
                {...field}
                {...props}
            />
            {meta.touched && meta.error ? (
                <div className="label">
                    <span className="label-text-alt text-error">{meta.error}</span>
                </div>
            ) : null}
        </div>
    );
}
