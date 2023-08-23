import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "../css/auth.css";
import googleIcon from "../img/icon/google.png";

function Auth() {
    const [email, setEmail] = useState("dippin@test.com");
    const [password, setPassword] = useState("123456");
    const [newAccount, setNewAccount] = useState(false);
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
            <h2> {newAccount ? "회원가입" : "로그인"}</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="email">이메일</label>
                <input id="email" type="email" required value={email} onChange={onChange} className="authInput" />
                <label htmlFor="password">비밀번호</label>
                <input id="password" type="password" required value={password} onChange={onChange} className="authInput" />
                <button type="submit" className=" authSubmit">
                    {newAccount ? "회원가입" : "로그인"}
                </button>
                {error && <span className="authError">{error}</span>}
                <button onClick={onSocialClick} name="google" className="authBtn">
                    <img src={googleIcon} alt="구글 아이콘" />
                    구글로 시작하기
                </button>
            </form>
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "로그인" : "회원가입"}
            </span>
        </div>
    );
}

export default Auth;
