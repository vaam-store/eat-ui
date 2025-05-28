import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { InputField } from '../input/input-field';
import { Form } from './form';

const meta: Meta<typeof Form> = {
	title: 'Form/Form',
	component: Form,
	tags: ['autodocs'],
	argTypes: {
		className: { control: 'text' },
		children: { control: false },
	},
};
export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
	render: (args) => (
		<Formik initialValues={{ email: '' }} onSubmit={() => {}}>
			<Form {...args}>
				<InputField
					label="Email"
					name="email"
					type="email"
					placeholder="Enter your email"
				/>
			</Form>
		</Formik>
	),
};
