import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './input-field';
import { Formik } from 'formik';

const meta: Meta<typeof InputField> = {
  title: 'Form/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    name: { control: 'text' },
    type: { control: 'text' },
    placeholder: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: 'Username',
    name: 'username',
    type: 'text',
    placeholder: 'Enter your username',
  },
  render: (args) => (
    <Formik initialValues={{ username: '' }} onSubmit={() => {}}>
      <InputField {...args} />
    </Formik>
  ),
};