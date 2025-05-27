import {
	type AuthenticationResponseJSON,
	type PublicKeyCredentialCreationOptionsJSON,
	type PublicKeyCredentialRequestOptionsJSON,
	type RegistrationResponseJSON,
	startAuthentication,
	startRegistration,
} from '@simplewebauthn/browser';
import { useMutation } from '@tanstack/react-query';
import type { CreateVendor, Vendor } from '@vaa/hooks/types';
import { useMedusa } from '@vaa/medusa';
import { useCallback } from 'react';

export function useRegister() {
	const { actualRegistrationFn, isPending: isPending_1 } =
		useActualRegistration();
	const { startRegistrationFn, isPending: isPending_2 } =
		useStartRegistration();
	const { completeRegistrationFn, isPending: isPending_3 } =
		useCompleteRegistration();
	const { createVendor, isPending: isPending_4 } = useCreateVendor();

	const register = useCallback(
		async (username: string) => {
			await actualRegistrationFn({ username });
			const options = await startRegistrationFn();

			const attResp = await startRegistration({
				optionsJSON: options,
			});

			await completeRegistrationFn(attResp);

			await createVendor({
				name: username,
				handle: `v-${username}`,
				admin: {
					email: `${encodeURIComponent(username)}@vaa.eat`,
				},
			});
		},
		[
			actualRegistrationFn,
			startRegistrationFn,
			completeRegistrationFn,
			createVendor,
		],
	);

	return {
		register,
		isPending: isPending_1 || isPending_2 || isPending_3 || isPending_4,
	};
}

export function useLogin() {
	const { startAuth, isPending: isPending_1 } = useStartAuth();
	const { completeAuth, isPending: isPending_2 } = useCompleteAuth();

	const login = useCallback(
		async (username: string) => {
			const { options, authId } = await startAuth({ username });

			const response = await startAuthentication({
				optionsJSON: options,
				useBrowserAutofill: true,
				verifyBrowserAutofillInput: true,
			});

			const attResp = await completeAuth({
				authJSON: response,
				authId: authId,
				username: username,
			});

			if (typeof attResp !== 'string') {
				throw new Error('Invalid authentication');
			}
		},
		[startAuth, completeAuth],
	);

	return { login, isPending: isPending_1 || isPending_2 };
}

export function useLogout() {
	const medusa = useMedusa();
	const { mutateAsync, isPending } = useMutation({
		mutationFn: async () => await medusa.auth.logout(),
	});

	return { completeAuth: mutateAsync, isPending };
}

export function useCompleteAuth() {
	const medusa = useMedusa();
	const { mutateAsync, isPending } = useMutation({
		mutationFn: async (input: {
			authId: string;
			authJSON: AuthenticationResponseJSON;
			username: string;
		}) => await medusa.auth.login('vendor', 'webauthn', input),
	});

	return { completeAuth: mutateAsync, isPending };
}

export function useStartAuth() {
	const medusa = useMedusa();
	const { mutateAsync, isPending } = useMutation({
		mutationFn: async (input: {
			username: string;
		}) =>
			await medusa.client.fetch<{
				authId: string;
				options: PublicKeyCredentialRequestOptionsJSON;
			}>('/webauthn/start-authentication', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: input,
			}),
	});

	return { startAuth: mutateAsync, isPending };
}

export function useActualRegistration() {
	const medusa = useMedusa();
	const { mutateAsync, isPending } = useMutation({
		mutationFn: async (input: { username: string }) =>
			await medusa.auth.register('vendor', 'webauthn', input),
	});

	return { actualRegistrationFn: mutateAsync, isPending };
}

export function useStartRegistration() {
	const medusa = useMedusa();
	const { mutateAsync, isPending } = useMutation({
		mutationFn: async () => {
			const { options } = await medusa.client.fetch<{
				options: PublicKeyCredentialCreationOptionsJSON;
			}>('/webauthn/start-registration', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			return options;
		},
	});

	return { startRegistrationFn: mutateAsync, isPending };
}

export function useCompleteRegistration() {
	const medusa = useMedusa();
	const { mutateAsync, isPending } = useMutation({
		mutationFn: async (input: RegistrationResponseJSON) => {
			const { result } = await medusa.client.fetch<{ result: boolean }>(
				'/webauthn/complete-registration',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: input,
				},
			);
			return result;
		},
	});

	return { completeRegistrationFn: mutateAsync, isPending };
}

export function useCreateVendor() {
	const medusa = useMedusa();
	const { mutateAsync, isPending } = useMutation({
		mutationFn: async (input: CreateVendor) => {
			const { vendor } = await medusa.client.fetch<{ vendor: Vendor }>(
				'/vendors',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: input,
				},
			);
			return vendor;
		},
	});

	return { createVendor: mutateAsync, isPending };
}
