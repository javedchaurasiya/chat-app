import React from 'react'
import RightNav from '../RightNav/RightNav.js'
import ChatComponent from '../ChatComponent/ChatComponent.js'
import './styles.css'

function Right({conversations,focussed,sendMessage}) {
  return (
    <div className="outer-right-container">
        <RightNav conversations={conversations} focussed={focussed}/>
        <ChatComponent conversations={conversations} focussed={focussed} sendMessage={sendMessage} />
    </div>
  )
}

export default Right