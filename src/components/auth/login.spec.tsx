import { fireEvent, render, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { Login } from './login';

jest.mock('next/navigation', () => ({
	useRouter: jest.fn(() => ({ push: jest.fn() })),
	useSearchParams: jest.fn(() => ({ get: jest.fn(() => 'test-redirect-url') })),
}));

describe('Login Component', () => {
	it('redirects to redirectUrl after login', async () => {
		const push = jest.fn();
		(useRouter as jest.Mock).mockImplementation(() => ({ push }));

		const { getByText, getByLabelText } = render(<Login />);
		const usernameInput = getByLabelText('Username');
		const loginButton = getByText('Login');

		fireEvent.change(usernameInput, { target: { value: 'test-username' } });
		fireEvent.click(loginButton);

		await waitFor(() => expect(push).toHaveBeenCalledTimes(1));
		expect(push).toHaveBeenCalledWith('test-redirect-url');
	});
});
