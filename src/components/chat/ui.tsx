'use client';

import type { inferRouterOutputs } from '@trpc/server';
import type { inferAsyncIterableYield } from '@trpc/server/unstable-core-do-not-import';
import { Button } from '@vaa/components/button';
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
			<div className="flex-grow space-y-2 overflow-y-auto p-4">
				{messages.map((message) => (
					<div key={message.id} className="chat chat-end">
						<div className="chat-bubble">
							{message.type === 'text-delta'
								? message.textDelta
								: JSON.stringify(message)}
						</div>
					</div>
				))}
			</div>

			<form onSubmit={handleSubmit} className="join w-full p-4">
				<input
					name="message"
					placeholder="Say something..."
					className="input input-bordered join-item flex-grow"
				/>
				<Button type="submit" color="primary" className="join-item">
					Send
				</Button>
			</form>
		</div>
	);
}
