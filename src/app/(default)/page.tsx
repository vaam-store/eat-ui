import { Suspense } from 'react';
import { AllProductsGrid } from '../../components/home/all-products-grid';
import { CategoryChipsRow } from '../../components/home/category-chips-row';
import { PopularProductsRow } from '../../components/home/popular-products-row';
import { SearchBarRow } from '../../components/home/search-bar-row';

// You might want to add a loading fallback for Suspense if data fetching is slow
function HomePageLoadingFallback() {
	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content text-center">
				<span className="loading loading-spinner loading-lg text-primary" />
			</div>
		</div>
	);
}

export default function HomePage() {
	return (
		<div className="flex min-h-screen flex-col gap-6 py-4">
			<div className="container mx-auto px-4">
				<SearchBarRow />
			</div>
			<Suspense fallback={<HomePageLoadingFallback />}>
				<div className="container mx-auto px-4">
					<CategoryChipsRow />
					<div className="divider" />
					<PopularProductsRow />
					<div className="divider" />
					<AllProductsGrid />
				</div>
			</Suspense>
		</div>
	);
}
