import React from 'react'
import './styles.css'
import Conversation from '../Conversation/Conversation.js'

function Conversations({conversations,focussed,changeFocussed}) {
  return (
    
    <div className="outer-conversations">
    {/* <Conversation/>
    <Conversation/>
    <Conversation/>
    <Conversation/>
    <Conversation/>
    <Conversation/>
    <Conversation/>
    <Conversation/>
    <Conversation/>
    <Conversation/> */}
    {conversations.map((conversation)=><Conversation key={conversation.id} conversation={conversation} changeFocussed={changeFocussed}/>)}
    </div>
    
  )
}

export default Conversations