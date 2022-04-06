import { React, useEffect } from "react";
import Left from "../../Components/Left/Left.js";
import Right from "../../Components/Right/Right.js";
import { selectUser } from "../../features/userSlice.js";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { io } from "socket.io-client";
import "./styles.css";

let socket;

function Home() {
  const user = useSelector(selectUser);

  const ENDPOINT = "localhost:2000";

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
      console.log(socket);
    };
    if (user) socketConnect();
  }, [ENDPOINT, user]);

  

  return !user ? (
    <Navigate to="/login" />
  ) : (
    <div className="outer-home">
      <div className="outer-left">
        <Left />
      </div>
      <div className="outer-right">
        <Right />
      </div>
    </div>
  );
}

export default Home;
