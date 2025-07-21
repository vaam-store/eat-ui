'use client';

import type {FormikConfig, FormikFormProps, FormikValues} from 'formik';
import {Form as FormikForm, Formik, useFormikContext} from 'formik';
import {ComponentPropsWithoutRef, memo, PropsWithChildren} from 'react';
import {twMerge} from 'tailwind-merge';
import {Button} from "@vaa/components/button";

interface FormProps extends Omit<FormikFormProps, 'children'>, Readonly<PropsWithChildren> {
}

export function Form<Values extends FormikValues = FormikValues>({
                                                                     children,
                                                                     className,
                                                                     formik,
                                                                     ...props
                                                                 }: FormProps & {
    formik: FormikConfig<Values>,
}) {
    return (
        <Formik {...formik}>
            <FormikForm
                className={twMerge('flex flex-col gap-4', className)}
                {...props}
            >
                {children}
            </FormikForm>
        </Formik>
    );
}

function FormContainer({
                           children,
                           className,
                       }: Readonly<PropsWithChildren<{ className?: string }>>) {
    const formik = useFormikContext();

    if (!formik) {
        throw new Error('FormContainer must be used within a Formik component');
    }

    return (
        <div className={twMerge('form-control gap-4', className)}>{children}</div>
    );
}

interface FormikButtonProps extends ComponentPropsWithoutRef<typeof Button> {
}

function FormikButton({
                          className,
                          type = 'submit',
                          size = 'xl',
                          ...props
                      }: FormikButtonProps) {
    const {isValid, isSubmitting} = useFormikContext();

    return (
        <Button
            as="button"
            className={twMerge(
                className,
                (!isValid || isSubmitting) && 'btn-disabled',
            )}
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            type={type}
            size={size}
            {...props}
        />
    );
}

interface FormGroupProps extends Readonly<PropsWithChildren> {
    className?: string;
}

function FormGroup({children, className}: FormGroupProps) {
    return (
        <div className={twMerge('flex flex-col gap-4', className)}>{children}</div>
    );
}


Form.Container = memo(FormContainer);
Form.Button = memo(FormikButton);
Form.Group = memo(FormGroup);
