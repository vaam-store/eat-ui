import { CategoryGrid } from '@vaa/components/home/category-grid';
import { CategorySkeleton } from '@vaa/components/home/category-skeleton';
import { Section } from '@vaa/components/section/section';
import { Title } from '@vaa/components/text/title';
import { Suspense } from 'react';

export function HomeCategories() {
	return (
		<Section className="flex flex-col gap-4 md:gap-8">
			<Title>Browse per category</Title>

			<Suspense fallback={<CategorySkeleton />}>
				<CategoryGrid />
			</Suspense>
		</Section>
	);
}
