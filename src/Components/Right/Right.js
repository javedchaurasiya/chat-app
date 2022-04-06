import React from 'react'
import RightNav from '../RightNav/RightNav.js'
import ChatComponent from '../ChatComponent/ChatComponent.js'
import './styles.css'

function Right() {
  return (
    <div className="outer-right-container">
        <RightNav/>
        <ChatComponent/>
    </div>
  )
}

export default Right