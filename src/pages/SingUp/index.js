import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/Auth";

import "./index.scss";
import LooneyLogo from "../../assets/images/looney-idea.png";

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [sended, setSended] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const { signUp } = useAuth();

  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const { error } = await signUp({ email, password });

    if (error) {
      alert("error signup in");
    } else {
      history.push("/");
    }
  };

  return (
    <div id="signup-page">
      <div className="lateral-logo">
        <img src={LooneyLogo} alt="" />
        <div className="title">
          <h1>SAVE IDEAS</h1>
          <h3>save your ideas forever you want</h3>
        </div>
      </div>
      <div className="login">
        <form className="form-login" onSubmit={handleLogin}>
          <h3>Please enter with your email to sign in</h3>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            ref={emailRef}
          ></input>
          <input
            className="inputField"
            type="password"
            placeholder="Your password"
            ref={passwordRef}
          ></input>
          <button type="submit" className={"button block"} disabled={loading}>
            {loading ? <span>Loading</span> : <span>Signup</span>}
          </button>
          <Link to="/login" className="gotoSignUp">
            Login
          </Link>
          {sended ? (
            <span>
              An Email as sent to yout mailbox please follow the link to enter
              in your Storage
            </span>
          ) : (
            <span></span>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
