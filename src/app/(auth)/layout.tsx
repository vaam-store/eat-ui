import {AuthContentWrapper} from '@vaa/components/auth/auth-content-wrapper';
import {AuthFooter} from '@vaa/components/auth/auth-footer';
import {AuthHeader} from '@vaa/components/auth/auth-header';
import {AuthSideSection} from '@vaa/components/auth/auth-side-section';
import {PropsWithChildren} from "react";

export const dynamic = 'force-dynamic';

export default function RootLayout({
                                       children,
                                   }: Readonly<PropsWithChildren>) {
    return (
        <div className="grid min-h-screen grid-cols-1 md:grid-cols-5 lg:grid-cols-3">
            <div className="hidden md:col-span-3 md:flex md:items-center md:justify-center lg:col-span-2">
                <AuthSideSection/>
            </div>

            <div className="card min-h-screen rounded-none bg-base-100 md:col-span-2 lg:col-span-1">
                <div className="card-body flex min-h-screen flex-col justify-between gap-6 p-6 md:p-8">
                    <div>
                        <AuthHeader/>
                        <AuthContentWrapper>{children}</AuthContentWrapper>
                    </div>
                    <AuthFooter/>
                </div>
            </div>
        </div>
    );
}
