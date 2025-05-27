import type { Meta, StoryObj } from '@storybook/react';
import { AuthHeader } from './auth-header';

const meta: Meta<typeof AuthHeader> = {
	title: 'Auth/AuthHeader',
	component: AuthHeader,
	tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AuthHeader>;

export const Default: Story = {};
