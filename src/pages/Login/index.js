import React, { useState, useRef } from "react";
import { supabase } from "../../assets/apis/supabaseClient.js";
import { Link } from "react-router-dom";

import "./index.scss";
import LooneyLogo from "../../assets/images/looney-idea.png";

function Login() {
  const [loading, setLoading] = useState(false);
  const [sended, setSended] = useState(false);
  const [email, setEmail] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const [password, setPassword] = useState("");

  const handleLogin = async (email) => {
    // try {
    //   setLoading(true);
    //   const { error } = await supabase.auth.signIn({ email });
    //   setSended(true);
    //   if (error) throw error;
    // } catch (error) {
    //   alert(error.error_description || error.message);
    //   setSended(false);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div id="login-page">
      <div className="lateral-logo">
        <img src={LooneyLogo} alt="" />
        <div className="title">
          <h1>SAVE IDEAS</h1>
          <h3>save your ideas forever you want</h3>
        </div>
      </div>
      <div className="login">
        <form className="form-login" onSubmit={handleLogin(email)}>
          <h3>Please enter with your email to sign in</h3>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            // onChange={(e) => setEmail(e.target.value)}
            ref={emailRef}
          ></input>
          <input
            className="inputField"
            type="password"
            placeholder="Your password"
            // onChange={(e) => setPassword(e.target.value)}
            ref={passwordRef}
          ></input>
          <button type="submit" className={"button block"} disabled={loading}>
            {loading ? <span>Loading</span> : <span>Login</span>}
          </button>
          <Link to="/signup" className="gotoSignUp">
            Sign Up
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

export default Login;
