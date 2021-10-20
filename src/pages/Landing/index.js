import React from "react";

import "./index.scss";
import LooneyLogo from "../../assets/images/looney-idea.png";
function Landing() {
  return (
    <div id="landing">
      <div class="lateral-logo">
        <img src={LooneyLogo} alt="" />
        <div className="title">
          <h1>SAVE IDEAS</h1>
          <h3>save your ideas forever you want</h3>
        </div>
      </div>
      <div className="login">
        <form className="form-login">
          <h3>Please enter with your email to sign in</h3>
          <input placeholder="Email" type="email"></input>
          <button>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Landing;
