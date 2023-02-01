import { createContext, useState } from "react";

export const AuthContext = createContext({});

function authProvider({ children }) {
    const [auth, setAuth] = useState({});
    const [userStatus, setUserStatus] = useState({});

    return (
        <AuthContext.Provider
            value={(auth, setAuth, userStatus, setUserStatus)}>
            {children}
        </AuthContext.Provider>
    );
}

export default authProvider;
