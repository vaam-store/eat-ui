'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { X } from 'react-feather';
import { BaseButton } from '../button';

type ModalProps = {
	open: boolean;
	title: string;
	onClose: () => void;
	children: ReactNode;
};

export function Modal({ open, onClose, children, title }: ModalProps) {
	// Close on ESC key
	useEffect(() => {
		if (!open) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [open, onClose]);

	return (
		<>
			{open && (
				<dialog
					open
					className="modal modal-open modal-middle"
					onCancel={onClose}
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
							<BaseButton
								circle
								aria-label="Close modal"
								onClick={onClose}
								type="button"
							>
								<X />
							</BaseButton>
						</div>
						<div className="py-4">{children}</div>
					</div>
					<div
						className="modal-backdrop"
						onClick={onClose}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								onClose();
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
