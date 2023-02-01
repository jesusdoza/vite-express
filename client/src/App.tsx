import { useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import NavLayout from "./components/NavLayout";
import Protected from "./components/Protected";
import Home from "./pages/Home";
// import Register from "./pages/Register.jsx";
import SignUpForm from "./pages/SignUpForm";

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
                <Route path="signup" element={<SignUpForm />} />
                <Route path="/login" element={<Login />} />
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
