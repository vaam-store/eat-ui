'use client';

interface AuthLayoutAnimationProps {
	children: React.ReactNode;
}

export const AuthLayoutAnimation: React.FC<AuthLayoutAnimationProps> = ({
	children,
}) => {
	return <div>{children}</div>;
};
