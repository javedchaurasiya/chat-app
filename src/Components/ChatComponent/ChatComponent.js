import { TextField } from "@mui/material";
import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import LeftChat from '../LeftChat/LeftChat.js'
import RightChat from '../RightChat/RightChat.js'
import "./styles.css";

function ChatComponent() {
  return (
    // <div className="abcd"></div>
    <div className="outer-chat-container">
      
      <div className="check">
      <ScrollToBottom className="inner-chat-container">
        <LeftChat message={{user:'Ritik',content:'Hey whatsup.',timeline:'Tue 12:08 PM 22/03/2022'}}/>
        <RightChat message={{user:'Me',content:'Nothing',timeline:'Tue 12:08 PM 22/03/2022'}}/>
        <LeftChat message={{user:'Ritik',content:'csdjcbsucccccccccccccccccccccccccccccdcccccccccccccc sybc scsyuc sycv scysv cc sycv',timeline:'Tue 12:08 PM 22/03/2022'}}/>
        <RightChat message={{user:'Me',content:'efefef ehfbe eufbd vuisb ivubv isubvs visubvs vsubv svius',timeline:'Tue 12:08 PM 22/03/2022'}}/>
        <LeftChat message={{user:'Ritik',content:'Hey whatsup.',timeline:'Tue 12:08 PM 22/03/2022'}}/>
        <RightChat message={{user:'Me',content:'Nothing',timeline:'Tue 12:08 PM 22/03/2022'}}/>
        <LeftChat message={{user:'Ritik',content:'csdjcbsu sybc scsyuc sycv scysv cc sycv',timeline:'Tue 12:08 PM 22/03/2022'}}/>
        <RightChat message={{user:'Me',content:'efefef ehfbe eufbd vuisb ivubv isubvs visubvs vsubv svius',timeline:'Tue 12:08 PM 22/03/2022'}}/>
        <RightChat message={{user:'Me',content:'efefef ehfbe eufbd vuisb ivubv isubvs visubvs vsubv svius',timeline:'Tue 12:08 PM 22/03/2022'}}/>
        <RightChat message={{user:'Me',content:'efefef ehfbe eufbd vuisb ivubv isubvs visubvs vsubv svius',timeline:'Tue 12:08 PM 22/03/2022'}}/>
        
      </ScrollToBottom>
      </div>
      <div className="chat-textfield-container">
      <TextField
      fullWidth
        className="chat-text-field"
        id="outlined-multiline-flexible"
        label="Multiline"
        multiline
        maxRows={4}
      />
      </div>
    </div>
  );
}

export default ChatComponent;
