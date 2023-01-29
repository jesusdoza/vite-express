import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
type navLayoutProps = {
    loginStatus: boolean;
    logout: () => void;
    loggedInUser: string;
};

function NavLayout({ logout, loginStatus, loggedInUser }: navLayoutProps) {
    return (
        <>
            <ul className="flex flex-wrap justify-center">
                <li className="bg-emerald-600">
                    <p>Logged in as: {loggedInUser}</p>
                </li>

                <li className="flex-1">
                    <Link to="/dashboard">Dashboard</Link>
                </li>

                <li className="flex-1">
                    <Link to="/inventory">Inventory</Link>
                </li>

                <li>
                    <Link to={"/inventory/add"}>Add Part</Link>
                </li>

                {!loginStatus && (
                    <li className="flex-1">
                        <Link to="/login">Login</Link>
                    </li>
                )}

                <li className="flex-1">
                    <button type="button" onClick={logout}>
                        Logout
                    </button>
                </li>
            </ul>

            <Outlet />
        </>
    );
}

export default NavLayout;
