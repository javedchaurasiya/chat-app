import { Avatar, Modal } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import "./styles.css";
import { useState } from "react";

function RightNav({ conversations, focussed }) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="imageModal">
          <Avatar
            variant="rounded"
            alt={focussed.to}
            src={focussed.imageURL}
            sx={{ width: "auto", height: "auto" }}
          />
        </div>
      </Modal>
      <div className="outer-right-nav">
        <Avatar
          onClick={() => {
            setOpenModal(true);
          }}
          alt={focussed.to}
          src={focussed.imageURL}
          sx={{ width: 54, height: 54, margin: "8px" }}
        />
        <div style={{ marginLeft: "10px" }}>{focussed.to}</div>
        <div className="right-nav-more">
          <MoreVertIcon />
        </div>
      </div>
    </>
  );
}

export default RightNav;
