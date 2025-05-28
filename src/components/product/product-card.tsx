import Image from 'next/image';
import type { Product } from '../../types/product';

export interface ProductCardProps {
	product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
	return (
		<div className="card card-compact bg-base-100 shadow-md transition-shadow hover:shadow-lg">
			<figure>
				{product.thumbnail ? (
					<Image
						src={product.thumbnail}
						alt={product.name}
						width={300}
						height={300}
						className="aspect-square object-cover"
					/>
				) : (
					<div className="skeleton flex h-48 w-full items-center justify-center bg-base-200">
						<span className="text-base-content text-opacity-50">No Image</span>
					</div>
				)}
			</figure>

			<div className="card-body">
				<h2 className="card-title truncate" title={product.name}>
					{product.name}
				</h2>
				<div className="flex flex-wrap gap-2">
					{product.category && (
						<div className="badge badge-secondary badge-outline">
							{product.category}
						</div>
					)}
					{product.vendor && (
						<div className="badge badge-accent badge-outline">
							@{product.vendor}
						</div>
					)}
				</div>
				{product.price && (
					<div className="card-actions justify-end">
						<p className="font-semibold text-lg text-primary">
							{product.price}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
