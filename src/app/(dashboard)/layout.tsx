import { BaseButton } from '@vaa/components/button';
import { ToggleTheme } from '@vaa/components/theme-toggle';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Home, MessageCircle, Package, ShoppingBag, User } from 'react-feather';

export default function DashboardLayout({
	children,
}: {
	children: ReactNode;
}) {
	// Add authentication or other middleware logic here
	return (
		<div className="drawer lg:drawer-open">
			<input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

			<div className="drawer-content flex flex-col">
				{/* Navbar */}
				<div className="navbar bg-base-100 shadow-sm">
					<div className="flex-none lg:hidden">
						<BaseButton
							as="label"
							htmlFor="dashboard-drawer"
							variant="ghost"
							className="btn-square"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="inline-block h-6 w-6 stroke-current"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</BaseButton>
					</div>
					<div className="flex-1">
						<BaseButton
							as={Link}
							href="/home"
							variant="ghost"
							className="text-xl"
						>
							VAAM Dashboard
						</BaseButton>
					</div>
					<div className="flex-none">
						<ToggleTheme />
					</div>
				</div>

				{/* Page content */}
				<div className="p-4">{children}</div>
			</div>

			<div className="drawer-side">
				<div
					className="drawer-overlay"
					onClick={() => {
						const checkbox = document.getElementById(
							'dashboard-drawer',
						) as HTMLInputElement;
						if (checkbox) checkbox.checked = false;
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							const checkbox = document.getElementById(
								'dashboard-drawer',
							) as HTMLInputElement;
							if (checkbox) checkbox.checked = false;
						}
					}}
					role="button"
					tabIndex={0}
				/>
				<ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
					<li className="menu-title">Dashboard</li>
					<li>
						<Link href="/home">
							<Home size={18} /> Home
						</Link>
					</li>
					<li>
						<Link href="/home/orders">
							<ShoppingBag size={18} /> Orders
						</Link>
					</li>
					<li>
						<Link href="/home/messages">
							<MessageCircle size={18} /> Messages
						</Link>
					</li>
					<li>
						<Link href="/home/profile">
							<User size={18} /> Profile
						</Link>
					</li>

					<li className="menu-title mt-4">Selling</li>
					<li>
						<Link href="/home/selling">
							<Package size={18} /> Products
						</Link>
					</li>
					<li>
						<Link href="/home/selling/orders">
							<ShoppingBag size={18} /> Seller Orders
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
