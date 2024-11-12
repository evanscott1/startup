import React from 'react';
import ChatMessage from './chatMessage';

import './chatHistory.css'

function ChatHistory() {
  const messages = [
    { sender: 'Henri', message: 'How can I assist you today?', isBot: true },
    { sender: 'User', message: 'I need to get a birthday gift for my nephew.', isBot: false },
    // More messages...
  ];

  return (
    <div className="chat-history">
      {messages.map((msg, index) => (
        <ChatMessage key={index} sender={msg.sender} message={msg.message} isBot={msg.isBot} />
      ))}
    </div>
  );
}

export default ChatHistory;
