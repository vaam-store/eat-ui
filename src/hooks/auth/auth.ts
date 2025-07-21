'use client';

import {
    type AuthenticationResponseJSON,
    type PublicKeyCredentialCreationOptionsJSON,
    type PublicKeyCredentialRequestOptionsJSON,
    type RegistrationResponseJSON,
    startAuthentication,
    startRegistration,
} from '@simplewebauthn/browser';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useMedusa} from '@vaa/hooks/medusa';
import {medusaAuthToken, medusaAuthTokenStorage,} from '@vaa/hooks/medusa/constants';
import type {CreateVendor, Vendor} from '@vaa/hooks/types';
import {useCallback} from 'react';

export function useIsAuthenticated() {
    return useQuery({
        queryKey: ['get-auth'],
        queryFn: async () => {
            try {
                const token = await medusaAuthTokenStorage.getItem(medusaAuthToken);
                return token !== null && token !== undefined;
            } catch (e) {
                console.error('cannot get token', e);
                return false;
            }
        },
    });
}

export function useRegister() {
    const {actualRegistrationFn, isPending: isPending_1} =
        useActualRegistration();
    const {startRegistrationFn, isPending: isPending_2} =
        useStartRegistration();
    const {completeRegistrationFn, isPending: isPending_3} =
        useCompleteRegistration();
    const {createVendor, isPending: isPending_4} = useCreateVendor();
    const {createCustomer, isPending: isPending_5} = useCreateCustomer();

    const register = useCallback(
        async (username: string) => {
            await actualRegistrationFn({username});
            const options = await startRegistrationFn();

            const attResp = await startRegistration({
                optionsJSON: options,
            });

            await completeRegistrationFn(attResp);

            const email = `${encodeURIComponent(username)}@vaa.eat`;
            await createVendor({
                name: username,
                handle: `v-${username}`,
                admin: {
                    email,
                },
            });
            
            await createCustomer(email);
        },
        [
            actualRegistrationFn,
            startRegistrationFn,
            completeRegistrationFn,
            createVendor,
            createCustomer,
        ],
    );

    return {
        register,
        isPending: isPending_1 || isPending_2 || isPending_3 || isPending_4 || isPending_5,
        progress: sumBoolToNum(isPending_1, isPending_2, isPending_3, isPending_4, isPending_5)
    };
}

export function useLogin() {
    const {startAuth, isPending: isPending_1} = useStartAuth();
    const {completeAuth, isPending: isPending_2} = useCompleteAuth();

    const login = useCallback(
        async (username: string) => {
            const {options, authId} = await startAuth({username});

            const response = await startAuthentication({
                optionsJSON: options,
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

    return {
        login,
        isPending: isPending_1 || isPending_2,
        progress: sumBoolToNum(isPending_1, isPending_2,)
    };
}

export function useLogout() {
    const medusa = useMedusa();
    const {mutateAsync, isPending} = useMutation({
        mutationFn: async () => await medusa.auth.logout(),
    });

    return {completeAuth: mutateAsync, isPending};
}

export function useCompleteAuth() {
    const medusa = useMedusa();
    const {mutateAsync, isPending} = useMutation({
        mutationFn: async (input: {
            authId: string;
            authJSON: AuthenticationResponseJSON;
            username: string;
        }) => await medusa.auth.login('vendor', 'webauthn', input),
    });

    return {completeAuth: mutateAsync, isPending};
}

export function useStartAuth() {
    const medusa = useMedusa();
    const {mutateAsync, isPending} = useMutation({
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

    return {startAuth: mutateAsync, isPending};
}

export function useActualRegistration() {
    const medusa = useMedusa();
    const {mutateAsync, isPending} = useMutation({
        mutationFn: async (input: { username: string }) =>
            await medusa.auth.register('vendor', 'webauthn', input),
    });

    return {actualRegistrationFn: mutateAsync, isPending};
}

export function useStartRegistration() {
    const medusa = useMedusa();
    const {mutateAsync, isPending} = useMutation({
        mutationFn: async () => {
            const {options} = await medusa.client.fetch<{
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

    return {startRegistrationFn: mutateAsync, isPending};
}

export function useCompleteRegistration() {
    const medusa = useMedusa();
    const {mutateAsync, isPending} = useMutation({
        mutationFn: async (input: RegistrationResponseJSON) => {
            const {result} = await medusa.client.fetch<{ result: boolean }>(
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

    return {completeRegistrationFn: mutateAsync, isPending};
}

export function useCreateVendor() {
    const medusa = useMedusa();
    const {mutateAsync, isPending} = useMutation({
        mutationFn: async (input: CreateVendor) => {
            const {vendor} = await medusa.client.fetch<{ vendor: Vendor }>(
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

    return {createVendor: mutateAsync, isPending};
}

export function useCreateCustomer() {
    const medusa = useMedusa();
    const {mutateAsync, isPending} = useMutation({
        mutationFn: async (email: string) => {
            await medusa.store.customer.create({
                email,
            });
        },
    });

    return {createCustomer: mutateAsync, isPending};
}

function boolToNum(bool: boolean): number {
    return bool ? 1 : 0;
}

function sumBoolToNum(...bools: boolean[]) {
    if (bools.length === 0) {
        return 0;
    }

    return bools.map(boolToNum).reduce((sum, val) => sum + val, 0) / bools.length;
}