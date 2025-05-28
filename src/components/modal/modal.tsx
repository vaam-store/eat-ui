'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

type ModalProps = {
	open: boolean;
	onClose: () => void;
	children: ReactNode;
};

export function Modal({ open, onClose, children }: ModalProps) {
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
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur"
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
						<button
							className="btn btn-ghost btn-sm absolute top-2 right-2"
							aria-label="Close modal"
							onClick={onClose}
							type="button"
						>
							✕
						</button>
						{children}
					</motion.div>
				</motion.dialog>
			)}
		</AnimatePresence>
	);
}
