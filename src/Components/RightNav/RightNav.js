import { Avatar } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react'
import './styles.css'

function RightNav({conversations,focussed}) {
  return (
    <div className='outer-right-nav'>
        <Avatar
        alt={focussed.to}
        src={focussed.imageURL}
        sx={{ width: 54, height: 54,margin:'8px' }}
      />
      <div style={{marginLeft:'10px'}}>{focussed.to}</div>
    <div className="right-nav-more">
        <MoreVertIcon/>
    </div>
    </div>
  )
}

export default RightNav