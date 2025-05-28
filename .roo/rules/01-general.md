# General rules

- This project is using `@vaa` as prefix
- always use function components
- never export default components
- medusaj is defined using a hoo. Check the medusa and the hooks folder.
- always think about server components fwhere required, with suspense to stream
- Always while naming files, use kebab-case.
- Dumb components might be better off being server components.
- Smart components if having browser logic, shall be client components.
- Always use react-feather for basic icons (import { <Icon's name> } from 'react-feather')
- this project make use of tailwind and daisyui. Check the corresponding rules.
- Always check the project architecture, expressed through the file ARCHITECHTURE.md
- Doing things like string concatenation with tailwind won't work. Always use full class name
- Never write README files, unless asked to.
- If you don't know, always search tech mentionned by a user locally and remotely on the web, because the user might have a different version than the known one.
- Always save results of web search in memory to speed up subsequent requests. Also save every information possible that might be important.
- Always think sequentially to realise a task and explicit steps.

- Use functional components and React Hooks, avoiding class components.
- Manage state using Zustand or React Query, if appropriate.
- Ensure that the code is modular and easily testable.
- Follow TypeScript best practices for typing components and state.
- Keep business logic separate from the UI layer.
- Implement lazy loading to improve performance.
- Suggest caching strategies to reduce backend requests.

- Suggest optimizations in Dockerfiles to reduce image sizes.
- Recommend strategies to improve container isolation and security.
- Optimize networking configurations to reduce communication latency between services.
- Ensure volumes are properly managed for data persistence.
- Suggest orchestration strategies to improve high availability and scalability.

- Follow Next.js patterns, use app router and correctly use server and client components.
- Use Tailwind CSS for styling.
- Use TanStack Query (react-query) for frontend data fetching.
- Use Formik for form handling.
- Use Zod for validation.
- Use React Context for state management.
- Follow AirBnB style guide for code formatting.
- Use PascalCase when creating new React files. UserCard, not user-card.
- Use named exports when creating new react components.
- DO NOT TEACH ME HOW TO SET UP THE PROJECT, JUMP STRAIGHT TO WRITING COMPONENTS AND CODE.

- This project uses biome for linting and formatting. Don't explain me how to use it.
