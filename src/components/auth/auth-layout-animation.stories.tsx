import type { Meta, StoryObj } from '@storybook/react';
import { AuthLayoutAnimation } from './auth-layout-animation';

const meta: Meta<typeof AuthLayoutAnimation> = {
	title: 'Auth/AuthLayoutAnimation',
	component: AuthLayoutAnimation,
	tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AuthLayoutAnimation>;

export const Default: Story = {
	args: {
		children: (
			<div style={{ padding: 24, background: '#e0e7ff', borderRadius: 8 }}>
				Animated Auth Content
			</div>
		),
	},
};
