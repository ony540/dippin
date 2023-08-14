import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "../css/auth.css";
import googleIcon from "../img/google.png";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const auth = getAuth();
            let data;
            if (newAccount) {
                //create account - 파이어베이스 내장 기능
                data = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                //log in
                // eslint-disable-next-line no-unused-vars
                data = await signInWithEmailAndPassword(auth, email, password);
            }
            // console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSocialClick = async (event) => {
        const auth = getAuth();
        let provider = new GoogleAuthProvider();
        // eslint-disable-next-line no-unused-vars
        const data = await signInWithPopup(auth, provider);
    };

    return (
        <div className="authContainer">
            <h2>로그인</h2>
            <form onSubmit={onSubmit} className="container">
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} className="authInput" />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} className="authInput" />
                <button type="submit" className=" authSubmit">
                    {newAccount ? "회원가입" : "로그인"}
                </button>
                {error && <span className="authError">{error}</span>}
            </form>
            <button onClick={onSocialClick} name="google" className="authBtn">
                <img src={googleIcon} alt="구글 아이콘" />
                구글로 시작하기
            </button>
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "로그인" : "회원가입"}
            </span>
        </div>
    );
}

export default Auth;
