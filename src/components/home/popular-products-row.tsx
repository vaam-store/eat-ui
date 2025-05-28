'use client';

import type { Product } from '../../types/product';
import { ProductCard } from '../product/product-card';

// Mock data - replace with actual data fetching
const popularProductsData: Product[] = [
	{
		id: 'prod_1',
		name: 'Spicy Pepperoni Pizza',
		thumbnail: 'https://picsum.photos/seed/pizza1/400/300',
		category: 'Pizza',
		vendor: "Luigi's Pizzeria",
		price: '€12.99',
		// Add other Product fields if necessary, e.g., description, rating
	},
	{
		id: 'prod_2',
		name: 'Classic Cheeseburger Deluxe',
		thumbnail: 'https://picsum.photos/seed/burger1/400/300',
		category: 'Burgers',
		vendor: 'Burger Queen',
		price: '€8.50',
	},
	{
		id: 'prod_3',
		name: 'Fresh Salmon Sushi Set',
		thumbnail: 'https://picsum.photos/seed/sushi1/400/300',
		category: 'Sushi',
		vendor: 'Tokyo Bites',
		price: '€15.00',
	},
	{
		id: 'prod_4',
		name: 'Vegan Buddha Bowl',
		thumbnail: 'https://picsum.photos/seed/vegan1/400/300',
		category: 'Vegan',
		vendor: 'Green Leaf Cafe',
		price: '€10.75',
	},
	{
		id: 'prod_5',
		name: 'Chicken Tikka Masala',
		thumbnail: 'https://picsum.photos/seed/indian1/400/300',
		category: 'Indian',
		vendor: 'Spice Route',
		price: '€13.20',
	},
	// Add more popular products as needed
];

export function PopularProductsRow() {
	return (
		<div className="bg-base-100 py-6 md:py-8">
			<div className="container mx-auto px-4">
				<h2 className="mb-4 font-semibold text-2xl md:mb-6 md:text-3xl">
					Popular Now
				</h2>
				<div className="flex snap-x snap-mandatory gap-4 overflow-x-scroll scroll-smooth">
					{popularProductsData.map((product) => (
						<div key={product.id} className="snap-start scroll-mr-6">
							<ProductCard product={product} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
