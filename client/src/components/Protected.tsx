import { Children } from "react";
import { Navigate } from "react-router-dom";

type protectedProps = {
    loginStatus: boolean;
    children: any
}

export default function Protected({ loginStatus, children }: protectedProps) {
    if (loginStatus === false) {
        return < Navigate to='/login' replace />
    }
    return (
        children
    )
}
