import type { ReactNode } from 'react';
import { AuthLayoutAnimation } from './auth-layout-animation';

interface AuthContentWrapperProps {
	children: ReactNode;
}

const AuthContentWrapper = ({ children }: AuthContentWrapperProps) => {
	return (
		<AuthLayoutAnimation>
			<div id="content">{children}</div>
		</AuthLayoutAnimation>
	);
};

export { AuthContentWrapper };
