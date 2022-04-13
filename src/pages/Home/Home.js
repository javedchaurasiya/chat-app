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
var socket;

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
        setFocussed(response.data.conversations[0]);
      } catch (error) {
        console.log(error);
        // alert("error");
      }
      setLoading(false);
    };
    if (user) getChats();
  }, []);

  useEffect(() => {
    const socketConnect = () => {
      console.log("Connecting");
      socket = io(ENDPOINT);
      socket.on("connect", () => {
        // console.log('connectec');
        console.log(socket.connected);
      });
      // socket.emit("userDetails", user.userName);
      socket.on("requestDetails", () => {
        socket.emit("getDetails", user.userName);
      });
      socket.on("onMessage", (message) => {
        // console.log(message);
        onMessage(message);
      });
      console.log(socket);
    };
    if (user) socketConnect();
    return () => {
      if (user) socket.emit("removeUser", user.userName);
    };
  }, [ENDPOINT, user,conversations,focussed]);

  useEffect(() => {
    console.log("focussed changed");
    console.log(focussed);
  }, [focussed]);
  useEffect(() => {
    console.log("rendered first");
  }, []);

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

  const checkFocussed = () => {
    console.log(focussed);
  };

  

  const onMessage = (message) => {
    checkFocussed();
    setAlert({ ...alert, display: false });
    console.log(message);
    console.log(focussed);
    if (focussed.to != message.from) {
      console.log("new message");
      setAlert({
        display: true,
        severity: "info",
        message: `New Message from ${message.from}`,
      });
    }
  };

  const sendMessage = async (message) => {
    // console.log(socket);
    console.log("entered sendMessage");
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
      socket.emit("message", message);
      console.log("sent");
      const response = await axios.post(
        getServerURL() + "sendMessage",
        { message },
        {
          headers: {
            authentication: "Bearer " + localStorage.token,
          },
        }
      );
      console.log(response);
      setAlert({ display: true, severity: "success", message: "Message Sent" });
    } catch (error) {
      console.log(error);
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
