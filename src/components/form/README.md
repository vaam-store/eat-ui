# Form Components

This directory contains custom form components built on top of Formik to provide consistent styling and behavior across the application.

## Components

### Form

A wrapper around Formik's `Form` component with additional styling.

```tsx
import { Form } from '@vaa/components/form';
import { Formik } from 'formik';

<Formik
  initialValues={{ name: '' }}
  onSubmit={handleSubmit}
>
  <Form>
    {/* Form fields */}
  </Form>
</Formik>
```

### FormContainer

A context-aware wrapper for form content that provides access to Formik context values.

```tsx
import { FormContainer } from '@vaa/components/form';
import { Formik } from 'formik';

<Formik
  initialValues={{ name: '' }}
  onSubmit={handleSubmit}
>
  {() => (
    <FormContainer>
      {/* Form fields */}
    </FormContainer>
  )}
</Formik>
```

### FormGroup

A component for grouping form elements with consistent spacing.

```tsx
import { Form, FormGroup } from '@vaa/components/form';

<Form>
  <FormGroup>
    <InputField name="firstName" label="First Name" />
    <InputField name="lastName" label="Last Name" />
  </FormGroup>
  <FormikButton type="submit">Submit</FormikButton>
</Form>
```

### FormError

A component to display form-level errors.

```tsx
import { Form, FormError } from '@vaa/components/form';

<Form>
  <InputField name="email" label="Email" />
  <FormError />
  <FormikButton type="submit">Submit</FormikButton>
</Form>
```

## Usage with Validation

These components work seamlessly with Formik's validation system, including Zod integration:

```tsx
import { Form, FormGroup } from '@vaa/components/form';
import { Formik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const Schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

<Formik
  initialValues={{ email: '', password: '' }}
  validationSchema={toFormikValidationSchema(Schema)}
  onSubmit={handleSubmit}
>
  <Form>
    <FormGroup>
      <InputField name="email" label="Email" type="email" />
      <InputField name="password" label="Password" type="password" />
    </FormGroup>
    <FormikButton type="submit">Submit</FormikButton>
  </Form>
</Formik>