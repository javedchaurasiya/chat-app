import React from 'react'
import './styles.css'

function LeftChat({message}) {
  return (
    <div className="l-message">
        <div className="message-header">{message.user}</div>
        <div className="message-body">{message.content}</div>
        <div className="message-fotter">{(message.timeline)}</div>
    </div>
  )
}

export default LeftChat