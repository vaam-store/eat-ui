'use client';

import { useEffect, useState } from 'react';
import type { Product } from '../../types/product';
import { ProductCard } from '../product/product-card';

// Mock data - replace with actual data fetching and more diverse products
const allProductsData: Product[] = [
	{
		id: 'prod_1',
		name: 'Spicy Pepperoni Pizza',
		thumbnail: 'https://picsum.photos/seed/pizza1/400/300',
		category: 'Pizza',
		vendor: "Luigi's Pizzeria",
		price: '€12.99',
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
	{
		id: 'prod_6',
		name: 'Pad Thai Noodles',
		thumbnail: 'https://picsum.photos/seed/thai1/400/300',
		category: 'Thai',
		vendor: 'Bangkok Street Food',
		price: '€11.50',
	},
	{
		id: 'prod_7',
		name: 'Margherita Pizza Special',
		thumbnail: 'https://picsum.photos/seed/pizza2/400/300',
		category: 'Pizza',
		vendor: "Mama's Kitchen",
		price: '€9.90',
	},
	{
		id: 'prod_8',
		name: 'Gourmet Double Beef Burger',
		thumbnail: 'https://picsum.photos/seed/burger2/400/300',
		category: 'Burgers',
		vendor: 'The Burger Joint',
		price: '€14.00',
	},
	{
		id: 'prod_9',
		name: 'Avocado Nigiri Platter',
		thumbnail: 'https://picsum.photos/seed/sushi2/400/300',
		category: 'Sushi',
		vendor: 'Sushi Heaven',
		price: '€18.50',
	},
	{
		id: 'prod_10',
		name: 'Lentil Soup (Vegan)',
		thumbnail: 'https://picsum.photos/seed/vegan2/400/300',
		category: 'Vegan',
		vendor: 'Healthy Bites',
		price: '€7.00',
	},
	// Add many more diverse products
];

// Function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = shuffled[i];
		shuffled[i] = shuffled[j] as T; // Type assertion as T
		shuffled[j] = temp as T; // Type assertion as T
	}
	return shuffled;
}

export function AllProductsGrid() {
	const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]);

	useEffect(() => {
		setShuffledProducts(shuffleArray(allProductsData));
	}, []);

	return (
		<div className="bg-base-200 py-6 md:py-8">
			<div className="container mx-auto px-4">
				<h2 className="mb-4 font-semibold text-2xl md:mb-6 md:text-3xl">
					Explore All Dishes
				</h2>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
					{shuffledProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</div>
	);
}
