import type { Meta, StoryObj } from '@storybook/react';
import { AuthFooter } from './auth-footer';

const meta: Meta<typeof AuthFooter> = {
	title: 'Auth/AuthFooter',
	component: AuthFooter,
	tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AuthFooter>;

export const Default: Story = {};
