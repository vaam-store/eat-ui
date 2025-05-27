'use client';

import type { inferRouterOutputs } from '@trpc/server';
import type { inferAsyncIterableYield } from '@trpc/server/unstable-core-do-not-import';
import type { AppRouter } from '@vaa/server/api/root';
import { api } from '@vaa/trpc/react';
import { useState } from 'react';

type Message = inferAsyncIterableYield<
	inferRouterOutputs<AppRouter>['ai']['chat']
> & { id: string };

export function Chat() {
	const [messages, setMessages] = useState<Message[]>([]);
	const { mutate } = api.ai.chat.useMutation({
		onSuccess: async function* (data) {
			for await (const part of data) {
				setMessages((prevMessages) => [...prevMessages, part as Message]);
			}
		},
	});

	const handleSubmit = () => {};

	return (
		<div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
			{messages.map((message) => (
				<div key={message.id} className="whitespace-pre-wrap">
					<div>{JSON.stringify(message)}</div>
				</div>
			))}

			<form onSubmit={handleSubmit}>
				<input placeholder="Say something..." />
			</form>
		</div>
	);
}
