import React, { useState, useEffect, useRef } from "react";

import {
    faCheck,
    faTimes,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
    const userRef = useRef<null | HTMLInputElement>(null);
    const errRef:
        | React.MutableRefObject<HTMLElement>
        | React.MutableRefObject<null> = useRef(null);

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState(false);

    //on mount focus on user input
    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    //check user name
    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    //check password
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    //check matching password
    useEffect(() => {
        setErrorMsg("");
    }, [pwd, matchPwd, user]);

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        //final username and password checks
        const uservalid = USER_REGEX.test(user);
        const pwdvalid = PWD_REGEX.test(pwd);
        if (!uservalid || !pwdvalid) {
            setErrorMsg("Invalid Entry");
            return;
        }
        console.log("send to server", uservalid, pwdvalid);
        setSuccess(true);
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Successfull Signup</h1>
                    <p>
                        <a className="btn">Sign In NEED REACT LINK</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive">
                        {errMsg}
                    </p>
                    <h1>Signup</h1>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                            <span className={validName ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span
                                className={
                                    validName || !user ? "hide" : "invalid"
                                }>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            onChange={(e) => {
                                setUser(e.target.value);
                            }}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />

                        <p
                            id="uidnote"
                            className={
                                userFocus && user && !validName
                                    ? "instructions"
                                    : "offscreen"
                            }>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.
                            <br />
                            Must begin with a letter.
                            <br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="password">
                            Password:
                            <span className={validPwd ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span
                                className={
                                    validPwd || !pwd ? "hide" : "invalid"
                                }>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onChange={(e) => setPwd(e.target.value)}
                            onFocus={(e) => setPwdFocus(true)}
                            onBlur={(e) => setPwdFocus(false)}
                        />
                        <p
                            id="pwdnote"
                            className={
                                pwdFocus && !validPwd
                                    ? "instructions"
                                    : "offscreen"
                            }>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.
                            <br />
                            Must include uppercase and lowercase letters, a
                            number and a special character.
                            <br />
                            Allowed special characters:{" "}
                            <span aria-label="exclamation mark">!</span>{" "}
                            <span aria-label="at symbol">@</span>{" "}
                            <span aria-label="hashtag">#</span>{" "}
                            <span aria-label="dollar sign">$</span>{" "}
                            <span aria-label="percent">%</span>
                        </p>
                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <span
                                className={
                                    validMatch && matchPwd ? "valid" : "hide"
                                }>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span
                                className={
                                    validMatch || !matchPwd ? "hide" : "invalid"
                                }>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            id="confirm_pwd"
                            type="password"
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            onFocus={(e) => setMatchFocus(true)}
                            onBlur={(e) => setMatchFocus(false)}
                        />
                        <p
                            id="confirmnote"
                            className={
                                matchFocus && !validMatch
                                    ? "instructions"
                                    : "offscreen"
                            }>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                        <button
                            className={
                                !validName || !validPwd || !validMatch
                                    ? "btn disabled"
                                    : "btn"
                            }
                            disabled={
                                !validName || !validPwd || !validMatch
                                    ? true
                                    : false
                            }
                            type="submit">
                            need react link Sign up
                        </button>
                    </form>

                    <p>
                        Already signed up?{" "}
                        <span className="line">
                            {" "}
                            <a className="btn" href="#">
                                need react link
                            </a>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
}

export default Register;
