'use client';

import { BaseButton } from '@vaa/components/button';
import { useRef, useState } from 'react';
import {
	ChevronLeft,
	ChevronRight,
	Coffee,
	Disc,
	Menu,
	Package,
	ShoppingBag,
} from 'react-feather'; // Added ShoppingBag for Indian

interface Category {
	id: string;
	name: string;
	icon: React.ElementType;
}

const categoriesData: Category[] = [
	{ id: 'pizza', name: 'Pizza', icon: Disc },
	{ id: 'burgers', name: 'Burgers', icon: Menu },
	{ id: 'sushi', name: 'Sushi', icon: Package },
	{ id: 'indian', name: 'Indian', icon: ShoppingBag }, // Using ShoppingBag as a placeholder
	{ id: 'vegan', name: 'Vegan', icon: Coffee }, // Using Coffee as a placeholder, consider a more specific icon
	{ id: 'italian', name: 'Italian', icon: Disc },
	{ id: 'mexican', name: 'Mexican', icon: Menu },
	{ id: 'chinese', name: 'Chinese', icon: Package },
	{ id: 'thai', name: 'Thai', icon: ShoppingBag },
	{ id: 'desserts', name: 'Desserts', icon: Coffee },
];

export function CategoryChipsRow() {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const handleCategoryClick = (categoryId: string) => {
		setSelectedCategory(categoryId);
		// Add logic to filter products based on category
		console.log('Selected category:', categoryId);
	};

	const scroll = (direction: 'left' | 'right') => {
		if (scrollContainerRef.current) {
			const scrollAmount = direction === 'left' ? -200 : 200;
			scrollContainerRef.current.scrollBy({
				left: scrollAmount,
				behavior: 'smooth',
			});
		}
	};

	return (
		<div className="bg-base-200 py-4 md:py-6">
			<div className="container relative mx-auto px-4">
				<h2 className="mb-3 font-semibold text-xl md:mb-4 md:text-2xl">
					Categories
				</h2>
				<div className="relative flex items-center">
					<BaseButton
						type="button"
						onClick={() => scroll('left')}
						variant="ghost"
						size="sm"
						circle
						className="-left-2 -translate-y-1/2 md:-left-4 absolute top-1/2 z-10 transform"
						aria-label="Scroll left"
					>
						<ChevronLeft size={20} />
					</BaseButton>
					<div
						ref={scrollContainerRef}
						className="no-scrollbar flex space-x-3 overflow-x-auto py-2"
						style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
					>
						{categoriesData.map((category) => (
							<BaseButton
								key={category.id}
								type="button"
								onClick={() => handleCategoryClick(category.id)}
								variant={selectedCategory === category.id ? 'fill' : 'outline'}
								color={selectedCategory === category.id ? 'primary' : undefined}
								className={`flex-shrink-0 gap-2 rounded-full ${
									selectedCategory !== category.id &&
									'border-base-300 hover:border-primary hover:bg-primary hover:text-primary-content'
								}`}
							>
								<category.icon size={18} />
								<span>{category.name}</span>
							</BaseButton>
						))}
					</div>
					<BaseButton
						type="button"
						onClick={() => scroll('right')}
						variant="ghost"
						size="sm"
						circle
						className="-right-2 -translate-y-1/2 md:-right-4 absolute top-1/2 z-10 transform"
						aria-label="Scroll right"
					>
						<ChevronRight size={20} />
					</BaseButton>
				</div>
			</div>
		</div>
	);
}
