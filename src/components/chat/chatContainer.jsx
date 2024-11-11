import React from 'react';
import ChatHeader from './chatHeader';
import ChatHistory from './chatHistory';
import ChatInput from './chatInput';
import Footer from '../footer';

import './chatContainer.css'

function ChatContainer() {
  return (
    <div className="chat-container">
      <ChatHeader />
      <ChatHistory />
      <ChatInput />
      <Footer />
    </div>
  );
}

export default ChatContainer;
