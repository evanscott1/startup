import React from 'react';

import './chatMessage.css'

function ChatMessage({ sender, message, isBot }) {
  return (
    <div className={`message ${isBot ? 'bot-message' : 'user-message'}`}>
      {isBot && <div className="logo"></div>}
      <p><strong>{sender}:</strong> {message}</p>
    </div>
  );
}

export default ChatMessage;
