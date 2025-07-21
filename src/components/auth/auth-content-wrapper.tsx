import {AuthLayoutAnimation} from './auth-layout-animation';
import type {PropsWithChildren} from "react";

const AuthContentWrapper = ({children}: Readonly<PropsWithChildren>) => {
    return (
        <AuthLayoutAnimation>
            <div id="content">{children}</div>
        </AuthLayoutAnimation>
    );
};

export {AuthContentWrapper};
