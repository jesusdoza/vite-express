import { useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import NavLayout from "./components/NavLayout";
import Protected from "./components/Protected";
import Home from "./pages/Home";
import Register from "./pages/Register.jsx";

function App() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState("no user");
    const navigate = useNavigate(); // will hold a navigate function

    ///HOOKS

    ///FUNCTIONS
    ///login user
    async function loginUser() {
        const bodyObj = {
            email: loginEmail,
            password: loginPassword,
        };
        const result = await apiFetch("login", "post", bodyObj);
        if (result.login == "success") {
            setLoginStatus(true);
            setLoggedInUser(result.user.username);
            return true;
        }
        return false;
    }

    // ///logout
    async function logout(): Promise<void> {
        const result = await apiFetch("logout", "get");
        if (result.logout) {
            setLoginStatus(false);
            setLoggedInUser("no user logged in");
            navigate("/");
        }
    }

    ///COMPONENT RETURN
    return (
        <>
            <Routes>
                <Route path="signup" element={<Register />} />
                <Route
                    path="/login"
                    element={
                        <Login
                            setLoginEmail={setLoginEmail}
                            setLoginPassword={setLoginPassword}
                            loginUser={loginUser}
                            setLoggedInUser={setLoggedInUser}
                        />
                    }
                />
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    );
}

// export default App;
export { App as default, apiFetch };

// ///generic fetch
async function apiFetch(endpoint = "", method = "get", body = {}) {
    const result = await fetch(
        `http://localhost:8000/api/${endpoint}?_method=${method}`,
        {
            method: "post",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }
    ).then((data) => data.json());

    return result;
}

///SIGNUP COMPONENT
function SignupForm() {
    let email: string;
    let username: string;
    let password: string;
    let passwordVerify: string;

    async function handleSignup() {
        const result = await apiFetch("logout", "get");
    }

    return (
        <>
            <section>
                <section>
                    <div className="w-full max-w-xs">
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            {/* USERNAME */}
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="username">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        username = event.target.value;
                                    }}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Username"
                                />
                            </div>

                            {/* EMAIL */}
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        email = event.target.value;
                                    }}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Username"
                                />
                            </div>

                            {/* PASSWORD */}
                            <div className="mb-6">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        password = event.target.value;
                                    }}
                                    name="password"
                                    id="password"
                                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="******************"
                                />
                            </div>

                            {/* PASSWORD VERIFY */}
                            <div className="mb-6">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="passwordVerify">
                                    Verify Password
                                </label>
                                <input
                                    type="password"
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        passwordVerify = event.target.value;
                                    }}
                                    name="passwordVerify"
                                    id="passwordVerify"
                                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="******************"
                                />
                            </div>

                            {/* BUTTON SUBMIT */}
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={handleSignup}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button">
                                    Sign Up
                                </button>

                                <a
                                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                    href="#">
                                    Forgot Password?
                                </a>
                            </div>
                        </form>
                    </div>
                </section>
            </section>
        </>
    );
}
