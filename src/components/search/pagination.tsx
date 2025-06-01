import { Button } from '@vaa/components/button';
import { ChevronLeft, ChevronRight } from 'react-feather';

export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	hasNextPage,
	hasPrevPage,
}: PaginationProps) {
	if (totalPages <= 1) {
		return null;
	}

	const handlePrev = () => {
		if (hasPrevPage) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (hasNextPage) {
			onPageChange(currentPage + 1);
		}
	};

	// Determine page numbers to display
	const pageNumbers = [];
	const maxPagesToShow = 5; // Show 5 page numbers at a time (e.g., 1 ... 3 4 5 ... 10)
	const halfPagesToShow = Math.floor(maxPagesToShow / 2);

	if (totalPages <= maxPagesToShow) {
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(i);
		}
	} else {
		// Always show first page
		pageNumbers.push(1);

		// Ellipsis after first page if needed
		if (currentPage > halfPagesToShow + 2) {
			pageNumbers.push('...');
		}

		// Determine start and end for middle numbers
		let startPage = Math.max(2, currentPage - halfPagesToShow);
		let endPage = Math.min(totalPages - 1, currentPage + halfPagesToShow);

		if (currentPage <= halfPagesToShow + 1) {
			endPage = Math.min(totalPages - 1, maxPagesToShow - 1);
		}
		if (currentPage >= totalPages - halfPagesToShow) {
			startPage = Math.max(2, totalPages - maxPagesToShow + 2);
		}

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}

		// Ellipsis before last page if needed
		if (currentPage < totalPages - halfPagesToShow - 1) {
			pageNumbers.push('...');
		}

		// Always show last page
		pageNumbers.push(totalPages);
	}

	return (
		<div className="join pagination my-8 flex justify-center">
			<Button
				type="button"
				variant="outline"
				className="join-item"
				onClick={handlePrev}
				disabled={!hasPrevPage}
				aria-label="Previous Page"
			>
				<ChevronLeft size={18} />
			</Button>

			{pageNumbers.map((page, index) =>
				typeof page === 'number' ? (
					<Button
						// biome-ignore lint/suspicious/noArrayIndexKey: Index is fine for pagination items
						key={`${page}-${index}`}
						type="button"
						variant={currentPage === page ? 'fill' : 'outline'}
						color={currentPage === page ? 'primary' : undefined}
						className="join-item"
						onClick={() => onPageChange(page)}
						aria-current={currentPage === page ? 'page' : undefined}
					>
						{page}
					</Button>
				) : (
					<Button
						as="span"
						// biome-ignore lint/suspicious/noArrayIndexKey: Index is fine for pagination items
						key={`ellipsis-${index}`}
						variant="outline"
						disabled
						className="join-item"
						aria-hidden="true" // This is okay for a non-interactive span
					>
						{page}
					</Button>
				),
			)}

			<Button
				type="button"
				variant="outline"
				className="join-item"
				onClick={handleNext}
				disabled={!hasNextPage}
				aria-label="Next Page"
			>
				<ChevronRight size={18} />
			</Button>
		</div>
	);
}
