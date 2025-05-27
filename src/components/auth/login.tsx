'use client';

import { useLogin } from '@vaa/hooks/auth';
import { useCallback, useEffect } from 'react';
import { z } from 'zod';

const Schema = z.object({
	username: z.string(),
});

export type DoLoginProps = z.infer<typeof Schema>;

export function Login({ username }: DoLoginProps) {
	const { login, isPending } = useLogin();

	const doLogin = useCallback(async () => {
		try {
			await login(username);
		} catch (e) {
			console.error(e);
		}
	}, [login, username]);

	useEffect(() => {
		doLogin();
	}, [doLogin]);

	return (
		<>
			<div className="loading loading-xl" />
		</>
	);
}
