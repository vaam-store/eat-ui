export interface Product {
	id: string;
	name: string;
	thumbnail?: string; // URL to the image
	price?: string; // Formatted price string, e.g., "$19.99"
	category?: string; // For filtering
	vendor?: string; // For filtering
	description?: string;
	// Add other relevant product fields as needed
}

export interface SearchParams {
	query: string;
	categories: string[];
	vendors: string[];
	exactKeywords: string[];
	page: number;
	limit: number;
}

export interface PaginatedProducts {
	products: Product[];
	totalProducts: number;
	totalPages: number;
	currentPage: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}
