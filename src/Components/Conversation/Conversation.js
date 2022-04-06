import { Avatar } from '@mui/material'
import React from 'react'
import './styles.css'

function Conversation() {
  return (
    <div className='main-conversation'>
        <Avatar
        alt="Ritik"
        src="https://pps.whatsapp.net/v/t61.24694-24/224185179_798810734854325_8441149062753365806_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=11841b29e90f68677f623bf12582677d&oe=624EBBDC"
        sx={{ width: 50, height: 50,m:'9px' }}
      />
      <div className="user-conversation-details">
          <div>Ritu Raj</div>
          <div className="last-conversation">
          Hey, This is Ritu Raj Shandilya. Yfuivciuy UViyvb scdsc
      </div>
          
      </div>
      {/* <div className='last-active' style={{fontSize:'12px'}}>Last Active: 22/03/2022</div> */}
    </div>
  )
}

export default Conversation