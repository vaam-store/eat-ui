import { HomeBecomeChef } from '@vaa/components/home/home-become-chef';
import { HomeCategories } from '@vaa/components/home/home-categories';
import { HomeLanding } from '@vaa/components/home/home-landing';
import { HomePopular } from '@vaa/components/home/home-popular';

export default function HomePage() {
	return (
		<div className="flex min-h-screen flex-col gap-6 py-4">
			<HomeLanding />
			<div className="h-4" />
			<HomeCategories />
			<HomePopular />

			<HomeBecomeChef />
		</div>
	);
}
