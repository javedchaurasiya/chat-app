import { TextField } from "@mui/material";
import InputEmoji from "react-input-emoji";
import { React, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import LeftChat from "../LeftChat/LeftChat.js";
import RightChat from "../RightChat/RightChat.js";
import { selectUser } from "../../features/userSlice.js";
import { useSelector } from "react-redux";
import randomBytes from "randombytes";
import "./styles.css";

function ChatComponent({ conversations, focussed, sendMessage }) {
  const user = useSelector(selectUser);
  const [messageBody, setMessageBody] = useState("");
  const handleOnEnter = () => {
    const message = {
      from: user.userName,
      to: focussed.to,
      content: messageBody,
      timeline: Date.now(),
      id: randomBytes(10).toString("hex"),
    };
    setMessageBody('')
    // console.log(message);
    sendMessage(message,focussed.imageURL)

  };
  return (
    <div className="outer-chat-container">
      <div className="check">
        <ScrollToBottom className="inner-chat-container">
          {focussed.conversation.map((msg) => {
            if (focussed.to == msg.from)
              return (
                <LeftChat
                  key={msg.id}
                  message={{
                    user: msg.from,
                    content: msg.content,
                    timeline: msg.timeline,
                  }}
                />
              );
            else
              return (
                <RightChat
                  key={msg.id}
                  message={{
                    user: "Me",
                    content: msg.content,
                    timeline: msg.timeline,
                  }}
                />
              );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-textfield-container">
        <InputEmoji
          value={messageBody}
          onChange={setMessageBody}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message"
        />
      </div>
    </div>
  );
}

export default ChatComponent;
