import React from 'react';
import ChatMessage from './chatMessage';

import './chatHistory.css'


function ChatHistory({messages}) {

  return (
    <div className="chat-history">
      {messages.map((msg, index) => (
        <ChatMessage key={index} sender={msg.sender} message={msg.message} isBot={msg.isBot} />
      ))}
    </div>
  );
}

export default ChatHistory;
