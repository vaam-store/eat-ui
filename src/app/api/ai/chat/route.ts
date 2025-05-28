import { NextResponse } from 'next/server';
// import { Configuration, OpenAIApi } from 'openai-edge'; // Example for OpenAI
// import { OpenAIStream, StreamingTextResponse } from 'ai'; // For Vercel AI SDK

// TODO: Configure your AI provider (e.g., OpenAI, Anthropic, etc.)
// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(config);

export async function POST(req: Request) {
	try {
		const { messages } = await req.json(); // Assuming messages are sent in the request body

		// Basic echo response for now
		if (messages && messages.length > 0) {
			const lastMessage = messages[messages.length - 1];
			return NextResponse.json({
				reply: `You said: "${lastMessage.content}"`,
			});
		}

		// TODO: Replace with actual AI call and streaming response
		// Example with Vercel AI SDK (ensure you have 'ai' package installed)
		/*
        const response = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo', // or your preferred model
          stream: true,
          messages,
        });
        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);
        */

		return NextResponse.json(
			{ error: 'No messages provided' },
			{ status: 400 },
		);
	} catch (error) {
		console.error('AI Chat Error:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
