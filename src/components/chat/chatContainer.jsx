import React from 'react';
import ChatHeader from './chatHeader';
import ChatHistory from './chatHistory';
import ChatInput from './chatInput';
import ChatFooter from './chatFooter';

import './chatContainer.css'

function ChatContainer() {
  return (
    <div className="chat-container">
      <ChatHeader />
      <ChatHistory />
      <ChatInput />
      <ChatFooter />
    </div>
  );
}

export default ChatContainer;
