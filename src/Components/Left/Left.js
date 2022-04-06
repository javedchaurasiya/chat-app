import React from "react";
import LeftNav from "../LeftNav/LeftNav.js";
import Conversations from "../Conversations/Conversations.js";
import './styles.css'

function Left() {
  return (
    <div className="outer-left-container">
      <LeftNav />
      <Conversations />
    </div>
  );
}

export default Left;
