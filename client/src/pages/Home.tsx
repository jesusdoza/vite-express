import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <div>Home</div>
            <p>description of app</p>

            <ul>
                <li className="flex-1">
                    <Link to="/signup">Signup</Link>
                </li>
                <li className="flex-1">
                    <Link to="/login">login</Link>
                </li>
            </ul>
        </>
    );
}
