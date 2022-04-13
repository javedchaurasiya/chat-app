import { Avatar } from '@mui/material'
import React from 'react'
import './styles.css'

function Conversation({conversation,changeFocussed}) {
  return (
    <div className='main-conversation' onClick={()=>{
      // console.log('div-clicked');
      changeFocussed(conversation.id)
    }}>
        <Avatar
        alt={conversation.to}
        src={conversation.imageURL}
        sx={{ width: 50, height: 50,m:'9px' }}
      />
      <div className="user-conversation-details">
          <div>{conversation.to}</div>
          <div className="last-conversation">
          {conversation.conversation.length?conversation.conversation[conversation.conversation.length-1].content:''}
      </div>
          
      </div>
      {/* <div className='last-active' style={{fontSize:'12px'}}>Last Active: 22/03/2022</div> */}
    </div>
  )
}

export default Conversation