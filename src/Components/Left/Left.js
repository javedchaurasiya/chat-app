import React from "react";
import LeftNav from "../LeftNav/LeftNav.js";
import Conversations from "../Conversations/Conversations.js";
import './styles.css'

function Left({conversations,focussed,changeFocussed,addUserToChat}) {
  return (
    <div className="outer-left-container">
      <LeftNav addUserToChat={addUserToChat} />
      <Conversations conversations={conversations} focussed={focussed} changeFocussed={changeFocussed} />
    </div>
  );
}

export default Left;
