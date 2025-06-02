'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { X } from 'react-feather';
import { twMerge } from 'tailwind-merge';
import { Button } from '../button';

export type ModalProps = {
	open: boolean;
	position?: 'bottom' | 'top' | 'left' | 'right';
	title: string;
	onCloseAction: () => void;
	children: ReactNode;
};

export function Modal({
	open,
	onCloseAction,
	children,
	title,
	position,
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
						'modal modal-open modal-bottom backdrop-blur-sm',
						!position && 'md:modal-middle',
						position === 'top' && 'md:modal-top',
						position === 'left' && 'md:modal-start',
						position === 'right' && 'md:modal-end',
						position === 'bottom' && 'md:modal-bottom',
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
