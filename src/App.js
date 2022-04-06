import { React, useEffect, useState, forwardRef } from "react";
import Home from "./pages/Home/Home.js";
import Login from "./pages/Login/Login.js";
import { io } from "socket.io-client";
import axios from "axios";
import getServerURL from "./serverURL.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { selectUser, login } from "../src/features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";

let socket;
const serverURL = getServerURL();

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({
    display: false,
    severity: "success",
    message: "message",
  });
  // const ENDPOINT = "localhost:2000";

  // useEffect(() => {
  //   console.log("Connecting");
  //   socket = io(ENDPOINT);
  //   socket.on("connect", () => {
  //     // console.log('connectec');
  //     console.log(socket.connected);
  //   });
  //   socket.on("hello", (name) => {
  //     console.log(name);
  //   });
  //   console.log(socket);
  // }, [ENDPOINT]);

  useEffect(() => {
    const getUserWithToken = async () => {
      try {
        const token = localStorage.token;
        const response =await axios.post(
          serverURL + "verifyUser",
          {},
          {
            headers: {
              authentication: "Bearer " + token,
            },
          }
        );
        console.log(response.data);
        console.log("verifying");
        dispatch(
          login({
            userName: response.data.userName,
            name: response.data.name,
            imageURL: response.data.imageURL,
          })
        );
        setAlert({
          ...alert,
          message: "Logged in Successfully",
          display: true,
          severity: "success",
        });
      } catch (error) {
        console.log(error);
        setAlert({
          ...alert,
          message: "Please Login/SignUp",
          display: true,
          severity: "info",
        });
      }
    };
    getUserWithToken();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ ...alert, display: false });
  };

  return (
    <Router>
      <Snackbar
        open={alert.display}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
