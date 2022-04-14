import { React, useState } from "react";
import { Avatar, Modal, Tooltip } from "@mui/material";
import moment from "moment";
import ImageModal from "../ImageModal/ImageModal";

import "./styles.css";

function Conversation({ conversation, changeFocussed }) {
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
            alt={conversation.to}
            src={conversation.imageURL}
            sx={{ width: 'auto', height: 'auto' }}
          />
        </div>
      </Modal>
      <Tooltip
        title={
          conversation.conversation.length
            ? "Last Active : " +
              moment
                .unix(
                  parseInt(
                    conversation.conversation[
                      conversation.conversation.length - 1
                    ].timeline
                  ) / 1000
                )
                .format("ddd, MMM D yyyy, h:mma")
            : ""
        }
        arrow
        placement="right"
      >
        <div
          className="main-conversation"
          onClick={() => {
            // console.log('div-clicked');
            changeFocussed(conversation.id);
          }}
        >
          <Avatar
            onClick={() => {
              setOpenModal(true);
            }}
            alt={conversation.to}
            src={conversation.imageURL}
            sx={{ width: 50, height: 50, m: "9px" }}
          />
          <div className="user-conversation-details">
            <div>{conversation.to}</div>
            <div className="last-conversation">
              {conversation.conversation.length
                ? conversation.conversation[
                    conversation.conversation.length - 1
                  ].content
                : ""}
            </div>
          </div>
          {/* <div className='last-active' style={{fontSize:'12px'}}>Last Active: 22/03/2022</div> */}
        </div>
      </Tooltip>
    </>
  );
}

export default Conversation;
