import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from './';

// Mock Formik context for FormikButton
const FormikContext = React.createContext({
	isValid: true,
	isSubmitting: false,
});
const FormikProvider: React.FC<
	React.PropsWithChildren<{ isValid?: boolean; isSubmitting?: boolean }>
> = ({ isValid = true, isSubmitting = false, children }) => (
	<FormikContext.Provider value={{ isValid, isSubmitting }}>
		{children}
	</FormikContext.Provider>
);

// BaseButton stories
const meta: Meta<typeof Button> = {
	title: 'Components/Button/BaseButton',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		color: {
			control: 'select',
			options: [
				'primary',
				'secondary',
				'accent',
				'info',
				'success',
				'warning',
				'error',
			],
		},
		variant: {
			control: 'select',
			options: ['fill', 'outline', 'ghost', 'link'],
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
		},
		loading: { control: 'boolean' },
		disabled: { control: 'boolean' },
		as: { control: false },
		className: { control: false },
	},
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		children: 'Primary Button',
		color: 'primary',
		variant: 'fill',
		size: 'md',
	},
};

export const Secondary: Story = {
	args: {
		children: 'Secondary Button',
		color: 'secondary',
		variant: 'fill',
		size: 'md',
	},
};

export const Outline: Story = {
	args: {
		children: 'Outline Button',
		color: 'primary',
		variant: 'outline',
		size: 'md',
	},
};

export const Loading: Story = {
	args: {
		children: 'Loading...',
		loading: true,
		color: 'primary',
		variant: 'fill',
		size: 'md',
	},
};

export const Disabled: Story = {
	args: {
		children: 'Disabled',
		disabled: true,
		color: 'primary',
		variant: 'fill',
		size: 'md',
	},
};

export const AsLink: Story = {
	args: {
		children: 'As Link',
		as: 'a',
		href: '#',
		color: 'primary',
		variant: 'outline',
		size: 'md',
	},
};

// Button.Formik stories
const metaFormik: Meta<typeof Button.Formik> = {
	title: 'Components/Button/FormikButton',
	component: Button.Formik,
	tags: ['autodocs'],
	decorators: [
		(Story, context) => (
			<FormikProvider
				isValid={context.args.isValid ?? true}
				isSubmitting={context.args.isSubmitting ?? false}
			>
				<Story />
			</FormikProvider>
		),
	],
	argTypes: {
		isValid: { control: 'boolean', table: { category: 'Mock Formik' } },
		isSubmitting: { control: 'boolean', table: { category: 'Mock Formik' } },
		children: { control: 'text' },
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
		},
	},
};
export { metaFormik as metaFormikButton };

type FormikStory = StoryObj<typeof Button.Formik>;

export const FormikDefault: FormikStory = {
	args: {
		children: 'Submit',
		size: 'xl',
		isValid: true,
		isSubmitting: false,
	},
};

export const FormikSubmitting: FormikStory = {
	args: {
		children: 'Submitting...',
		size: 'xl',
		isValid: true,
		isSubmitting: true,
	},
};

export const FormikInvalid: FormikStory = {
	args: {
		children: 'Invalid',
		size: 'xl',
		isValid: false,
		isSubmitting: false,
	},
};
