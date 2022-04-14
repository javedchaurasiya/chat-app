import React from 'react'
import moment from 'moment'
import './styles.css'

function LeftChat({message}) {
  return (
    <div className="l-message">
        <div className="message-header">{message.user}</div>
        <div className="message-body">{message.content}</div>
        <div className="message-fotter">{moment.unix(parseInt(message.timeline)/1000).format('ddd, MMM D yyyy, h:mma')}</div>
    </div>
  )
}

export default LeftChat