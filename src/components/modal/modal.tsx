'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { X } from 'react-feather';
import { twMerge } from 'tailwind-merge';
import { Button } from '../button';

export type ModalProps = {
	open: boolean;
	top?: boolean;
	title: string;
	onCloseAction: () => void;
	children: ReactNode;
};

export function Modal({
	open,
	onCloseAction,
	children,
	title,
	top = false,
}: ModalProps) {
	// Close on ESC key
	useEffect(() => {
		if (!open) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onCloseAction();
		};
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [open, onCloseAction]);

	return (
		<>
			{open && (
				<dialog
					open
					className={twMerge(
						'modal modal-open md:modal-middle',
						top && 'modal-top',
						!top && 'modal-bottom',
					)}
					onCancel={onCloseAction}
				>
					<div
						className="modal-box"
						onClick={(e) => e.stopPropagation()}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.stopPropagation();
							}
						}}
						tabIndex={-1}
					>
						<div className="flex items-center justify-between">
							<h3 className="font-bold text-lg">{title}</h3>
							<Button
								shape="circle"
								aria-label="Close modal"
								onClick={onCloseAction}
								type="button"
							>
								<X />
							</Button>
						</div>
						<div className="py-4">{children}</div>
					</div>
					<div
						className="modal-backdrop"
						onClick={onCloseAction}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								onCloseAction();
							}
						}}
						role="button"
						tabIndex={0}
					/>
				</dialog>
			)}
		</>
	);
}
