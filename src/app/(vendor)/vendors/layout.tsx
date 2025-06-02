import { Button } from '@vaa/components/button';
import { ToggleTheme } from '@vaa/components/theme-toggle';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import {
	Home,
	Menu,
	MessageCircle,
	Package,
	ShoppingBag,
	User,
	X,
} from 'react-feather';

export default function DashboardLayout({ children }: PropsWithChildren) {
	return (
		<div className="drawer lg:drawer-open">
			<input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

			<div className="drawer-content flex flex-col">
				{/* Navbar */}
				<div className="navbar bg-base-200">
					<div className="flex-none lg:hidden">
						<Button
							as="label"
							htmlFor="dashboard-drawer"
							variant="ghost"
							className="btn-square"
						>
							<Menu />
						</Button>
					</div>
					<div className="flex-1">
						<Button
							as={Link}
							href="/vendors"
							variant="ghost"
							className="text-xl"
						>
							Dashboard
						</Button>
					</div>

					<div className="flex-none">
						<Button as={Link} shape="circle" href="/">
							<X />
						</Button>
					</div>
				</div>

				{/* Page content */}
				<div className="pt-4 md:px-4">{children}</div>
			</div>

			<div className="drawer-side">
				<div className="drawer-overlay" />
				<label
					htmlFor="dashboard-drawer"
					aria-label="close sidebar"
					className="drawer-overlay"
				/>
				<ul className="menu min-h-full w-80 border-base-300 border-r-1 bg-base-200 p-4 text-base-content">
					<li className="menu-title">
						<div className="flex flex-row items-center justify-between bg-base-200!">
							<span>Dashboard</span>
							<ToggleTheme />
						</div>
					</li>
					<li>
						<Link href="/vendors">
							<Home size={18} /> Home
						</Link>
					</li>
					<li>
						<Link href="/vendors/orders">
							<ShoppingBag size={18} /> Orders
						</Link>
					</li>
					<li>
						<Link href="/vendors/messages">
							<MessageCircle size={18} /> Messages
						</Link>
					</li>
					<li>
						<Link href="/vendors/profile">
							<User size={18} /> Profile
						</Link>
					</li>

					<li className="menu-title mt-4">Selling</li>
					<li>
						<Link href="/vendors/selling">
							<Package size={18} /> Products
						</Link>
					</li>
					<li>
						<Link href="/vendors/selling/orders">
							<ShoppingBag size={18} /> Seller Orders
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
