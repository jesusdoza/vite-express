import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type loginProps = {
    setLoginPassword: (value: string) => void;
    setLoginEmail: (value: string) => void;
    loginUser: () => Promise<boolean>;
    setLoggedInUser: React.Dispatch<React.SetStateAction<string>>;
};

function Login({
    setLoginEmail,
    setLoginPassword,
    loginUser,
    setLoggedInUser,
}: loginProps) {
    const navigate = useNavigate();
    const [errorFlag, setErrorFlag] = useState(false);

    async function handleLogin() {
        const result = await loginUser();
        console.log(result);
        if (result) {
            // console.log(`login sucess at login component`)
            navigate("/inventory");
        } else {
            console.log("problem loggin in");
            setErrorFlag(true);
        }
    }

    return (
        <section>
            <div className="w-full max-w-xs">
                {errorFlag && (
                    <section>
                        <h2>Error logging in please try again</h2>
                    </section>
                )}
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="username">
                            Username / Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setLoginEmail(event.target.value);
                            }}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Username"
                        />
                    </div>
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
                                setLoginPassword(event.target.value);
                            }}
                            name="password"
                            id="password"
                            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="******************"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleLogin}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button">
                            Sign In
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
    );
}

export default Login;
