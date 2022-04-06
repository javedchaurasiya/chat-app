import { Avatar } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react'
import './styles.css'

function RightNav() {
  return (
    <div className='outer-right-nav'>
        <Avatar
        alt="Ritik"
        src="https://pps.whatsapp.net/v/t61.24694-24/224185179_798810734854325_8441149062753365806_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=11841b29e90f68677f623bf12582677d&oe=624EBBDC"
        sx={{ width: 54, height: 54,margin:'8px' }}
      />
      <div style={{marginLeft:'10px'}}>Ritik</div>
    <div className="right-nav-more">
        <MoreVertIcon/>
    </div>
    </div>
  )
}

export default RightNav