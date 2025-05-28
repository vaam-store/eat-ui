import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { TextareaField } from './textarea-field';

const withFormik = (Story: any) => (
	<Formik initialValues={{ story: '' }} onSubmit={() => {}}>
		{() => <Story />}
	</Formik>
);

const meta: Meta<typeof TextareaField> = {
	title: 'Components/Input/TextareaField',
	component: TextareaField,
	tags: ['autodocs'],
	decorators: [withFormik],
	argTypes: {
		color: {
			control: 'select',
			options: [
				'primary',
				'secondary',
				'accent',
				'neutral',
				'info',
				'success',
				'warning',
				'error',
			],
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
		},
		variant: {
			control: 'select',
			options: ['default', 'ghost'],
		},
		label: { control: 'text' },
		name: { control: 'text' },
		placeholder: { control: 'text' },
		className: { control: false },
	},
};
export default meta;

type Story = StoryObj<typeof TextareaField>;

export const Primary: Story = {
	args: {
		label: 'Primary Textarea',
		name: 'story',
		color: 'primary',
		size: 'md',
		variant: 'default',
		placeholder: 'Type here...',
	},
};

export const AllColors: Story = {
	render: (args) => (
		<div className="flex flex-col gap-4">
			{[
				'primary',
				'secondary',
				'accent',
				'neutral',
				'info',
				'success',
				'warning',
				'error',
			].map((color) => (
				<TextareaField
					key={color}
					{...args}
					color={color as import('./textarea-types').TextareaColor}
					label={`${color.charAt(0).toUpperCase() + color.slice(1)} Textarea`}
					name={`story_${color}`}
					placeholder={`Type ${color}...`}
				/>
			))}
		</div>
	),
	args: {
		size: 'md',
		variant: 'default',
	},
};

export const AllSizes: Story = {
	render: (args) => (
		<div className="flex flex-col gap-4">
			{['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
				<TextareaField
					key={size}
					{...args}
					size={size as import('./textarea-types').TextareaSize}
					label={`${size.toUpperCase()} Textarea`}
					name={`story_${size}`}
					placeholder={`Type ${size}...`}
				/>
			))}
		</div>
	),
	args: {
		color: 'primary',
		variant: 'default',
	},
};

export const GhostVariant: Story = {
	args: {
		label: 'Ghost Textarea',
		name: 'story_ghost',
		color: 'primary',
		size: 'md',
		variant: 'ghost',
		placeholder: 'Type here...',
	},
};
