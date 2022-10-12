import React from "react";
import {  getAuth,
  GoogleAuthProvider,
  signInWithPopup} from 'firebase/auth';
import AuthForm from "../components/AuthForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import "../css/auth.css";

function Auth() {

    const onSocialClick = async (event) => {
 
    const auth = getAuth();
    let  provider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth,provider);
    console.log(data);
    }

  return(
    <div className="authContainer">
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
          </button>
      </div>
    </div>
  )
};

export default Auth;

