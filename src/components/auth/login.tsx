'use client';

import {Form} from '@vaa/components/form';
import {InputField} from '@vaa/components/input/input-field';
import {Text} from '@vaa/components/text/text';
import {useLogin} from '@vaa/hooks/auth/auth';
import {useRedirects} from '@vaa/hooks/auth/utils';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {z} from 'zod';
import {toFormikValidationSchema} from 'zod-formik-adapter';
import {useCallback} from "react";
import type {FormikHelpers} from "formik";

const Schema = z.object({
    username: z.string().min(1, 'Username is required'),
});

type Values = z.input<typeof Schema>;

export function Login() {
    const {login} = useLogin();
    const router = useRouter();
    const {redirectUrl, nextQueryString, queryString} = useRedirects();
    const onSubmit = useCallback(async ({username}: Values, formikHelpers: FormikHelpers<Values>) => {
        try {
            await login(username);
            router.push(`${redirectUrl}?=${nextQueryString}`);
        } catch (error) {
            console.error(error);
        }
    }, [login]);

    return (
        <Form
            formik={{
                onSubmit,
                validationSchema: toFormikValidationSchema(Schema),
                initialValues: {username: ''},
            }}
        >
            <Form.Group>
                <InputField
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="Enter your username"
                />

                <Text className="label">
                    <span>Don't have an account? </span>

                    <Link
                        replace
                        href={`/auth/register?${queryString}`}
                        className="link"
                    >
                        Register here
                    </Link>
                </Text>
            </Form.Group>

            <Form.Button type="submit">Login</Form.Button>
        </Form>
    );
}
