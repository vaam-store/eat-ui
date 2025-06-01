import Link from 'next/link';
import { Home, List, Search, User } from 'react-feather';

export function DefaultDock() {
	return (
		<div className="dock bg-base-200 text-base-content">
			<Link href="/" prefetch className="dock-active">
				<Home />
				<span className="dock-label">Home</span>
			</Link>

			<Link href="/search" prefetch>
				<Search />
				<span className="dock-label">Search</span>
			</Link>

			<Link href="/orders">
				<List />
				<span className="dock-label">Order</span>
			</Link>

			<Link href="/home">
				<User />
				<span className="dock-label">You</span>
			</Link>
		</div>
	);
}
