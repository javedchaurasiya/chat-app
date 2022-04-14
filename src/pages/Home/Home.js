import { React, useEffect, useState } from "react";
import Left from "../../Components/Left/Left.js";
import Right from "../../Components/Right/Right.js";
import { selectUser } from "../../features/userSlice.js";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { io } from "socket.io-client";
import getServerURL from "../../serverURL";
import axios from "axios";
// import * as Crypto from 'expo-crypto'
// import * as Random from 'expo-random';
import randomBytes from "randombytes";
import "./styles.css";
import MyAlert from "../../Components/MyAlert/MyAlert";

const serverURL = getServerURL();
let socket;

function Home() {
  const [alert, setAlert] = useState({
    display: false,
    severity: "error",
    message: "test",
  });

  const user = useSelector(selectUser);
  const [conversations, setConversations] = useState([]);
  const [focussed, setFocussed] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [mySocket, setMySocket] = useState(null);
  const ENDPOINT = "localhost:2000";

  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await axios.post(
          serverURL + "getChat",
          {},
          {
            headers: {
              authentication: "Bearer " + localStorage.token,
            },
          }
        );
        setConversations(response.data.conversations);
        setFocussed({...response.data.conversations[0]});
      } catch (error) {
        console.log(error);
        // alert("error");
      }
      setLoading(false);
    };
    if (user) getChats();
  }, []);

  useEffect(() => {
    // console.log(typeof socket);
    // if(user&&socket&&socket.connected==true)
    // {
    //   console.log('Still connected');
    //   return
    // }
    const socketConnect = () => {
      console.log("Connecting");
      // console.log(socket);
      socket = io(ENDPOINT);
      // setMySocket(socket)
      socket.on("connect", () => {
        console.log(socket.connected);
      });
      // socket.emit("userDetails", user.userName);
      socket.on("requestDetails", () => {
        socket.emit("getDetails", user.userName);
      });
      socket.on("onMessage", (message, imageURL) => {
        // console.log(message);
        onMessage(message, imageURL,focussed);
      });
      // console.log(socket);
    };
    if(user)socketConnect();

    return ()=> {if(socket)socket.disconnect()}
    
  }, [ENDPOINT, user,focussed,conversations,socket]);

  

  // useEffect(() => {
  //   console.log("focussed changed");
  //   if(focussed)console.log(focussed.to);
  // }, [focussed]);

  const changeFocussed = (conversationId) => {
    const newFocussed = conversations.find(
      (conversation) => conversation.id == conversationId
    );
    // console.log(newFocussed);
    setFocussed({ ...newFocussed });
    // console.log(focussed);
  };

  const addUserToChat = (conversation) => {
    var filteredConversations = conversations.filter((value) => {
      return value.id != conversation.id;
    });
    filteredConversations.unshift(conversation);
    setConversations([...filteredConversations]);
    setFocussed(conversation);
  };

  const getFocus=()=>{
    return {...focussed};
  }

  const onMessage = (message, imageURL,focussed) => {
    // checkFocussed();
    // let nf=getFocus();
    // console.log(nf);
    setAlert({ ...alert, display: false });
    // console.log(message);
    // console.log(imageURL);
    // console.log(focussed.to);
    // console.log(conversations);
    if (focussed.to != message.from) {
      // console.log(focussed.to);
      // console.log("new message");
      setAlert({
        display: true,
        severity: "info",
        message: `New Message from ${message.from}`,
      });
      let senderFound = conversations.find((conversation) => {
        return conversation.to == message.from;
      });
      let newConversations = conversations.filter((conversation) => {
        return conversation.to != message.from;
      });
      // console.log('debug');
      if (!senderFound) {
        // console.log('sender not found');
        senderFound = {
          id: randomBytes(10).toString("hex"),
          to: message.from,
          imageURL,
          conversation: [],
        };
        
      }
      // console.log('sender found');
      senderFound.conversation.push(message);
      newConversations.unshift(senderFound);
      setConversations(newConversations);
      // console.log('inside if');
    } else {
      // console.log("Doing Things");
      let newConversations = conversations.filter((conversation) => {
        return conversation.id != focussed.id;
      });
      focussed.conversation.push(message);
      newConversations.unshift(focussed);
      setConversations([...newConversations]);
      setFocussed({ ...focussed });
      // console.log('inside else');
    }
  };

  const sendMessage = async (message, imageURL) => {
    // console.log(socket);
    // console.log("entered sendMessage");
    // console.log(imageURL);
    setAlert({ ...alert, display: false });
    try {
      focussed.conversation.push(message);
      setFocussed({ ...focussed });
      for (var i = 0; i < conversations.length; i++) {
        if (conversations[i].id == focussed.id) {
          conversations[i] = focussed;
          setConversations([...conversations]);
          break;
        }
      }
      addUserToChat(focussed);
      socket.emit("message", message, imageURL);
      // console.log("sent");
      const response = await axios.post(
        getServerURL() + "sendMessage",
        { message },
        {
          headers: {
            authentication: "Bearer " + localStorage.token,
          },
        }
      );
      // console.log(response);
      setAlert({ display: true, severity: "success", message: "Message Sent" });
    } catch (error) {
      // console.log(error);
      setAlert({
        display: true,
        severity: "error",
        message: "Something went wrong",
      });
    }
  };

  return !user ? (
    <Navigate to="/login" />
  ) : loading ? (
    <h1>loading...</h1>
  ) : (
    <div className="outer-home">
      {alert.display && (
        <MyAlert severity={alert.severity} message={alert.message} />
      )}
      <div className="outer-left">
        
        <Left
          conversations={conversations}
          focussed={focussed}
          changeFocussed={changeFocussed}
          addUserToChat={addUserToChat}
        />
      </div>
      <div className="outer-right">
        <Right
          conversations={conversations}
          focussed={focussed}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default Home;
