import { api } from '@vaa/trpc/server';

export default async function Home() {
	void api.post.getLatest.prefetch();

	return <div>Home page</div>;
}
