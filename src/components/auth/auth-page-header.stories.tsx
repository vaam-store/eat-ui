import type { Meta, StoryObj } from '@storybook/react';
import { AuthPageHeader } from './auth-page-header';

// Storybook decorator to mock usePathname
import React from 'react';

// Mock usePathname for Storybook
const PathnameContext = React.createContext('/auth/login');
function useMockPathname() {
	return React.useContext(PathnameContext);
}

// Patch next/navigation.usePathname to use our context
import * as nextNavigation from 'next/navigation';
(nextNavigation as any).usePathname = useMockPathname;

const meta: Meta<typeof AuthPageHeader> = {
	title: 'Auth/AuthPageHeader',
	component: AuthPageHeader,
	tags: ['autodocs'],
	argTypes: {
		title: { control: 'text' },
	},
};
export default meta;

type Story = StoryObj<typeof AuthPageHeader>;

export const LoginTabActive: Story = {
	args: {
		title: 'Welcome Back',
	},
	render: (args) => (
		<PathnameContext.Provider value="/auth/login">
			<AuthPageHeader {...args} />
		</PathnameContext.Provider>
	),
};

export const RegisterTabActive: Story = {
	args: {
		title: 'Create Account',
	},
	render: (args) => (
		<PathnameContext.Provider value="/auth/register">
			<AuthPageHeader {...args} />
		</PathnameContext.Provider>
	),
};
