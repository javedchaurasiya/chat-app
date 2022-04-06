import React from "react";
import Avatar from "@mui/material/Avatar";
import AddCommentIcon from "@mui/icons-material/AddComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector,useDispatch } from "react-redux";
import { selectUser, logout } from "../../features/userSlice";
import "./styles.css";

function LeftNav() {
  const user = useSelector(selectUser);
  const dispatch=useDispatch()
  const logoutUser=()=>{
    dispatch(logout())
  }
  return (
    <div className="outer-left-nav">
      <Avatar
        alt={user.userName}
        src={user.imageURL}
        sx={{ width: 54, height: 54, margin: "8px" }}
      />
      <div className="add-new-container">
        <LogoutIcon onClick={logoutUser} sx={{ mr: 1 }}  />
        <AddCommentIcon sx={{ mr: 1 }} />
        <MoreVertIcon />
      </div>
    </div>
  );
}

export default LeftNav;
