import { React, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import AddCommentIcon from "@mui/icons-material/AddComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { selectUser, logout } from "../../features/userSlice";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import "./styles.css";
import { TextField } from "@mui/material";
import axios from "axios";
import getServerURL from "../../serverURL";
import Alert from "../MyAlert/MyAlert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: 450,
};

const userResult = (name, userName, imageURL, getUserChat) => {
  return (
    <div key={userName} className="user-result-container">
      <Avatar alt={name} src={imageURL} sx={{ width: 56, height: 56 }} />
      <div className="userName-container">
        <div>{name}</div>
        <div style={{ fontSize: "12px" }}>{userName}</div>
      </div>
      <AddCommentIcon
        sx={{
          position: "absolute",
          right: "0",
          marginRight: "10px",
          fontSize: "35px",
          marginTop: "9px",
        }}
        onClick={() => {
          getUserChat(userName, imageURL);
        }}
      />
    </div>
  );
};

function LeftNav({ addUserToChat }) {
  const [alert, setAlert] = useState({
    display: false,
    severity: "error",
    message: "test",
  });
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logout());
  };

  useEffect(() => {
    setAlert({ ...alert, display: false });
    if (searchText != "") setSearching(true);
    const timeoutId = setTimeout(() => {
      const getUsers = async () => {
        try {
          const response = await axios.post(getServerURL() + "searchUser", {
            userName: searchText,
          });
          // console.log(response.data);
          setSearchResult(response.data.result);
        } catch (error) {
          console.log(error);
          setAlert({
            display: true,
            severity: "error",
            message: "Something Went Wrong",
          });
        }
      };
      if (searchText != "") getUsers();
      setSearching(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const getUserChat = async (userName, imageURL) => {
    setAlert({ ...alert, display: false });
    try {
      // console.log('abcd');
      const response = await axios.post(
        getServerURL() + "addUserToChat",
        { userName, imageURL },
        {
          headers: {
            authentication: "Bearer " + localStorage.token,
          },
        }
      );
      console.log(response.data);
      addUserToChat(response.data.result);
      setAlert({
        display: true,
        severity: "success",
        message: "User Added Successfully",
      });
    } catch (error) {
      console.log(error);
      setAlert({
        display: true,
        severity: "error",
        message: "Something Went Wrong",
      });
    }
  };

  return (
    <>
      {alert.display && (
        <Alert severity={alert.severity} message={alert.message} />
      )}
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-popup">
            <div className="search-box">
              <TextField
                fullWidth
                label="Search"
                id="fullWidth"
                placeholder="Search User"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {searching ? <CircularProgress color="success" /> : null}
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="search-results">
              {searchResult.map((user) =>
                userResult(user.name, user.userName, user.imageURL, getUserChat)
              )}
            </div>
          </div>
        </Box>
      </Modal>
      <div className="outer-left-nav">
        <Avatar
          alt={user.userName}
          src={user.imageURL}
          sx={{ width: 54, height: 54, margin: "8px" }}
        />
        <div className="add-new-container">
          <LogoutIcon onClick={logoutUser} sx={{ mr: 1 }} />
          <AddCommentIcon sx={{ mr: 1 }} onClick={()=>setOpenModal(true)} />
          <MoreVertIcon />
        </div>
      </div>
    </>
  );
}

export default LeftNav;
