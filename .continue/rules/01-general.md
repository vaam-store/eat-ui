# General rules

- This project is using `@vaa` as prefix
- always use function components
- never export default components
- always think about server components fwhere required, with suspense to stream
- Always while naming files, use kebab-case.
- Dumb components might be better off being server components.
- Smart components if having browser logic, shall be client components.
- Always use react-feather for basic icons (import { <Icon's name> } from 'react-feather')
- this project make use of tailwind and daisyui. Check the corresponding rules.
- Always check the project architecture, expressed through the file ARCHITECHTURE.md
- Doing things like string concatenation with tailwind won't work. Always use full class name
- Never write README files, unless asked to.
- Unless ask to, never implement tRPC procedure.
- Unless asked to, never implement a test.
