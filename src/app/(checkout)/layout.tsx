import {PropsWithChildren} from 'react';

export default function CheckoutLayout({
                                           children,
                                       }: Readonly<PropsWithChildren>) {
    // Add checkout-specific middleware logic here
    // Removed console log for production
    return <>{children}</>;
}
