'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { BaseButton } from '../button';
import { X } from 'react-feather';

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
		<AnimatePresence>
			{open && (
				<motion.dialog
					open
					className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black/40 backdrop-blur"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
				>
					<motion.div
						className="relative w-full max-w-md rounded-lg bg-base-100 p-6 shadow-lg"
						initial={{ opacity: 0, scale: 0.95, y: 40 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 40 }}
						transition={{ type: 'spring', stiffness: 300, damping: 30 }}
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex flex-row items-center justify-between">
							<h1 className="app-title">{title}</h1>

							<BaseButton
								circle
								aria-label="Close modal"
								onClick={onClose}
								type="button"
							>
								<X />
							</BaseButton>
						</div>
						{children}
					</motion.div>
				</motion.dialog>
			)}
		</AnimatePresence>
	);
}
