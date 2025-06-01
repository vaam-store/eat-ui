import { HomeSearch } from '@vaa/components/home/home-search';
import { HomeSearchSkeleton } from '@vaa/components/home/home-search-skeleton';
import { Section } from '@vaa/components/section/section';
import { Text } from '@vaa/components/text/text';
import { Title } from '@vaa/components/text/title';
import { Suspense } from 'react';

export function HomeLanding() {
	return (
		<Section className="flex flex-col items-center gap-4 md:gap-8">
			<Title heading className="text-center leading-[normal]">
				Homemade Delights
			</Title>

			<Text className="max-w-md text-center">
				Discover amazing homemade food from talented home chefs in your
				neighborhood
			</Text>

			<div className="w-full max-w-lg">
				<Suspense fallback={<HomeSearchSkeleton />}>
					<HomeSearch />
				</Suspense>
			</div>
		</Section>
	);
}
