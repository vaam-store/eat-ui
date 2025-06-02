import Link from 'next/link';
import { Home, List, Search, Settings } from 'react-feather';

export function DefaultDock() {
	return (
		<div className="dock bg-base-200 text-base-content">
			<Link href="/" prefetch className="dock-active">
				<Home />
			</Link>

			<Link href="/search" prefetch>
				<Search />
			</Link>

			<Link href="/orders">
				<List />
			</Link>

			<Link href="/settings">
				<Settings />
			</Link>
		</div>
	);
}
