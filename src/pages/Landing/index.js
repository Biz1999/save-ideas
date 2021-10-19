import React from "react";

import "./index.scss";
import LooneyLogo from "../../assets/images/looney-idea.png";
function Landing() {
  return (
    <div id="landing">
      <div class="lateral-logo">
        <img src={LooneyLogo} alt="" />
        <h1>SAVE IDEAS</h1>
      </div>
    </div>
  );
}

export default Landing;
