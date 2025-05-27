# storybook
- always include a provider for dependencies for services when writing playbooks Stories. E.g: for Formik:
```ts
const withFormik = (Story: React.ComponentType) => (
  <Formik initialValues={{ story: '' }} onSubmit={() => {}}>
    {() => <Story />}
  </Formik>
);
```