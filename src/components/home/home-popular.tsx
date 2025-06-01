import { DishesGrid } from '@vaa/components/home/dishes-grid';
import { DishesGridSkeleton } from '@vaa/components/home/dishes-grid-skeleton';
import { Section } from '@vaa/components/section/section';
import { Title } from '@vaa/components/text/title';
import { Suspense } from 'react';

export function HomePopular() {
	return (
		<Section className="flex flex-col gap-4 md:gap-8">
			<Title>Popular dishes</Title>

			<Suspense fallback={<DishesGridSkeleton />}>
				<DishesGrid />
			</Suspense>
		</Section>
	);
}
