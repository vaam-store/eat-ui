import type { Meta, StoryObj } from '@storybook/react';
import { AuthContentWrapper } from './auth-content-wrapper';

const meta: Meta<typeof AuthContentWrapper> = {
	title: 'Auth/AuthContentWrapper',
	component: AuthContentWrapper,
	tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AuthContentWrapper>;

export const Default: Story = {
	args: {
		children: (
			<div style={{ padding: 24, background: '#f3f4f6', borderRadius: 8 }}>
				Mock Auth Content
			</div>
		),
	},
};
