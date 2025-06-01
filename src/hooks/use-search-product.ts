import { useCallback, useEffect, useState } from 'react';
import type {
	PaginatedProducts,
	Product,
	SearchParams,
} from '../types/product'; // Assuming Product types are in src/types

// Mock product data - replace with actual API call
const MOCK_PRODUCTS: Product[] = Array.from({ length: 50 }, (_, i) => ({
	id: `prod_${i + 1}`,
	name: `Product ${i + 1}`,
	thumbnail: `https://picsum.photos/seed/${i + 1}/200/300`,
	price: `$${((i + 1) * 5.99).toFixed(2)}`,
	category: `Category ${String.fromCharCode(65 + (i % 5))}`, // A, B, C, D, E
	vendor: `Vendor ${String.fromCharCode(88 + (i % 3))}`, // X, Y, Z
	description: `This is a detailed description for Product ${
		i + 1
	}. It's a fantastic item.`,
}));

const ITEMS_PER_PAGE = 12;

const parseSearchQuery = (query: string): Partial<SearchParams> => {
	const categories: string[] = [];
	const vendors: string[] = [];
	const exactKeywords: string[] = [];
	let remainingQuery = query;

	// Extract hashtags (categories)
	const categoryRegex = /#(\w+)/g;
	let match: RegExpExecArray | null;
	// biome-ignore lint/suspicious/noAssignInExpressions: Biome doesn't like this, but it's a common pattern
	while ((match = categoryRegex.exec(remainingQuery)) !== null) {
		if (match[1]) categories.push(match[1]);
	}
	remainingQuery = remainingQuery.replace(categoryRegex, '').trim();

	// Extract at symbols (vendors)
	const vendorRegex = /@(\w+)/g;
	// biome-ignore lint/suspicious/noAssignInExpressions: Biome doesn't like this, but it's a common pattern
	while ((match = vendorRegex.exec(remainingQuery)) !== null) {
		if (match[1]) vendors.push(match[1]);
	}
	remainingQuery = remainingQuery.replace(vendorRegex, '').trim();

	// Extract exact keywords (quoted strings)
	const exactKeywordRegex = /"([^"]+)"/g;
	// biome-ignore lint/suspicious/noAssignInExpressions: Biome doesn't like this, but it's a common pattern
	while ((match = exactKeywordRegex.exec(remainingQuery)) !== null) {
		if (match[1]) exactKeywords.push(match[1]);
	}
	remainingQuery = remainingQuery.replace(exactKeywordRegex, '').trim();

	return {
		query: remainingQuery, // The rest of the query string
		categories,
		vendors,
		exactKeywords,
	};
};

// Mock API call
const fetchProductsAPI = async (
	params: SearchParams,
): Promise<PaginatedProducts> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			let filteredProducts = MOCK_PRODUCTS;

			// Filter by general query (name, description)
			if (params.query) {
				const lowerQuery = params.query.toLowerCase();
				filteredProducts = filteredProducts.filter(
					(p) =>
						p.name.toLowerCase().includes(lowerQuery) ||
						p.description?.toLowerCase().includes(lowerQuery),
				);
			}

			// Filter by categories
			if (params.categories.length > 0) {
				filteredProducts = filteredProducts.filter((p) =>
					params.categories.some(
						(cat: string) => p.category?.toLowerCase() === cat.toLowerCase(),
					),
				);
			}

			// Filter by vendors
			if (params.vendors.length > 0) {
				filteredProducts = filteredProducts.filter((p) =>
					params.vendors.some(
						(ven: string) => p.vendor?.toLowerCase() === ven.toLowerCase(),
					),
				);
			}

			// Filter by exact keywords (in name or description)
			if (params.exactKeywords.length > 0) {
				filteredProducts = filteredProducts.filter((p) =>
					params.exactKeywords.every((keyword: string) => {
						const lowerKeyword = keyword.toLowerCase();
						return (
							p.name.toLowerCase().includes(lowerKeyword) ||
							p.description?.toLowerCase().includes(lowerKeyword)
						);
					}),
				);
			}

			const totalProducts = filteredProducts.length;
			const totalPages = Math.ceil(totalProducts / params.limit);
			const startIndex = (params.page - 1) * params.limit;
			const endIndex = startIndex + params.limit;
			const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

			resolve({
				products: paginatedProducts,
				totalProducts,
				totalPages,
				currentPage: params.page,
				hasNextPage: params.page < totalPages,
				hasPrevPage: params.page > 1,
			});
		}, 500); // Simulate network delay
	});
};

export interface UseSearchProductReturn {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	products: Product[];
	loading: boolean;
	error: Error | null;
	pagination: {
		currentPage: number;
		totalPages: number;
		totalProducts: number;
		hasNextPage: boolean;
		hasPrevPage: boolean;
		goToPage: (page: number) => void;
	};
	parsedParams: Partial<SearchParams>;
	rawQueryInput: string;
	setRawQueryInput: (input: string) => void;
	executeSearch: () => void;
}

export const useSearchProduct = (
	initialQuery = '',
	initialPage = 1,
): UseSearchProductReturn => {
	const [rawQueryInput, setRawQueryInput] = useState(initialQuery);
	const [searchParams, setSearchParams] = useState<SearchParams>(() => {
		const parsed = parseSearchQuery(initialQuery);
		return {
			query: parsed.query || '',
			categories: parsed.categories || [],
			vendors: parsed.vendors || [],
			exactKeywords: parsed.exactKeywords || [],
			page: initialPage,
			limit: ITEMS_PER_PAGE,
		};
	});
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [paginationInfo, setPaginationInfo] = useState({
		currentPage: initialPage,
		totalPages: 0,
		totalProducts: 0,
		hasNextPage: false,
		hasPrevPage: false,
	});

	const fetchAndSetProducts = useCallback(async (params: SearchParams) => {
		setLoading(true);
		setError(null);
		try {
			const result = await fetchProductsAPI(params);
			setProducts(result.products);
			setPaginationInfo({
				currentPage: result.currentPage,
				totalPages: result.totalPages,
				totalProducts: result.totalProducts,
				hasNextPage: result.hasNextPage,
				hasPrevPage: result.hasPrevPage,
			});
		} catch (e) {
			setError(e instanceof Error ? e : new Error('Failed to fetch products'));
			setProducts([]);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchAndSetProducts(searchParams);
	}, [searchParams, fetchAndSetProducts]);

	const executeSearch = useCallback(() => {
		const parsed = parseSearchQuery(rawQueryInput);
		setSearchParams((prev: SearchParams) => ({
			...prev,
			query: parsed.query || '',
			categories: parsed.categories || [],
			vendors: parsed.vendors || [],
			exactKeywords: parsed.exactKeywords || [],
			page: 1, // Reset to first page on new search
		}));
	}, [rawQueryInput]);

	const goToPage = (page: number) => {
		if (page > 0 && page <= paginationInfo.totalPages) {
			setSearchParams((prev: SearchParams) => ({ ...prev, page }));
		}
	};

	return {
		searchQuery: searchParams.query, // This is the parsed base query
		setSearchQuery: (query: string) => {
			// This might be deprecated in favor of rawQueryInput + executeSearch
			const parsed = parseSearchQuery(query);
			setRawQueryInput(query); // Keep raw input for the text field
			setSearchParams((prev: SearchParams) => ({
				...prev,
				query: parsed.query || '',
				categories: parsed.categories || [],
				vendors: parsed.vendors || [],
				exactKeywords: parsed.exactKeywords || [],
				page: 1,
			}));
		},
		products,
		loading,
		error,
		pagination: {
			...paginationInfo,
			goToPage,
		},
		parsedParams: {
			query: searchParams.query,
			categories: searchParams.categories,
			vendors: searchParams.vendors,
			exactKeywords: searchParams.exactKeywords,
		},
		rawQueryInput,
		setRawQueryInput,
		executeSearch,
	};
};
