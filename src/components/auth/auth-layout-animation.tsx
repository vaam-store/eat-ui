'use client';

import { motion } from 'motion/react';

const defaultHeroConfig = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

interface AuthLayoutAnimationProps {
	children: React.ReactNode;
}

export const AuthLayoutAnimation: React.FC<AuthLayoutAnimationProps> = ({
	children,
}) => {
	return (
		<motion.div
			variants={defaultHeroConfig}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			{children}
		</motion.div>
	);
};
