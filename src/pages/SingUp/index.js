import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/Auth";
import { supabase } from "../../assets/apis/supabaseClient";

import "./index.scss";
import LooneyLogo from "../../assets/images/looney-idea.png";

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [sended, setSended] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const { signUp } = useAuth();

  const history = useHistory();

  const handleSignup = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const username = nameRef.current.value.trim();

    const { error } = await signUp({ email, password });
    if (error) {
      alert("error signup in");
    } else {
      const { data, error } = await supabase
        .from("profiles")
        .insert({ name: username, email: email });
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
        <form className="form-login" onSubmit={handleSignup}>
          <h3>Please enter with your information to sign in</h3>
          <input
            className="inputField"
            type="text"
            placeholder="Your Name"
            ref={nameRef}
          ></input>
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
