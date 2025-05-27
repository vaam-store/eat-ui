import { createTRPCRouter, publicProcedure } from '@vaa/server/api/trpc';
import { coreMessageSchema, streamText, tool } from 'ai';
import { z } from 'zod';

const systemPrompt =
	'You are a helpful assistant to retailers. You can help users find products, answer questions about them, and provide information about their availability.';

export const aiRouter = createTRPCRouter({
	chat: publicProcedure
		.input(
			z.object({
				messages: z.array(coreMessageSchema),
			}),
		)
		.mutation(async function* ({ input, ctx }) {
			const result = streamText({
				model: ctx.openai('gpt-4o'),
				system: systemPrompt,
				messages: input.messages,
				tools: {
					search_products: tool({
						description: 'Search for products',
						parameters: z.object({
							query: z
								.string()
								.describe('The query to use when searching for products'),
							limit: z
								.number()
								.describe('The maximum number of items to retrieve.'),
							offset: z
								.number()
								.describe(
									'The number of items to skip before retrieving the returned items.',
								),
							category_id: z
								.array(z.string())
								.optional()
								.describe('The ID of the categories to filter products by'),
						}),
						execute: async ({ query, limit, offset, category_id }) => {
							const response = await ctx.medusa.store.product.list({
								q: query,
								limit,
								offset,
								category_id: category_id,
							});
							return {
								query,
								limit,
								offset,
								products: response.products,
							};
						},
					}),
					get_single_product: tool({
						description: 'Get a single product by ID',
						parameters: z.object({
							id: z.string().describe('ID of the product to retrieve'),
						}),
						execute: async ({ id }) => {
							const response = await ctx.medusa.store.product.retrieve(id);
							return {
								id,
								product: response.product,
							};
						},
					}),
					search_categories: tool({
						description: 'Search for categories',
						parameters: z.object({
							query: z
								.string()
								.describe('The query to use when searching for categories'),
							limit: z
								.number()
								.describe('The maximum number of items to retrieve.'),
							offset: z
								.number()
								.describe(
									'The number of items to skip before retrieving the returned items.',
								),
						}),
						execute: async ({ query, limit, offset }) => {
							const response = await ctx.medusa.store.category.list({
								q: query,
								limit,
								offset,
							});
							return {
								query,
								limit,
								offset,
								categories: response.product_categories,
							};
						},
					}),
					get_single_category: tool({
						description: 'Get a single category by ID',
						parameters: z.object({
							id: z.string().describe('ID of the category to retrieve'),
						}),
						execute: async ({ id }) => {
							const response = await ctx.medusa.store.category.retrieve(id);
							return {
								id,
								category: response.product_category,
							};
						},
					}),
				},
			});

			for await (const chunk of result.fullStream) {
				yield chunk;
			}
		}),
});
