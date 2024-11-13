import React from 'react';
import { useState } from 'react';
import ChatHeader from './chatHeader';
import ChatHistory from './chatHistory';
import ChatInput from './chatInput';
import ChatFooter from './chatFooter';

import './chatContainer.css'

function AddUserMessage() {
  
}


function ChatContainer(props) {

  const [messages, setMessages] = useState([
    { sender: 'Henri', message: 'How can I assist you today?', isBot: true }
  ]);

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };


  return (
    <div className="chat-container">
      <ChatHeader logout={props.logout}/>
      <ChatHistory messages={messages}/>
      <ChatInput onSend={addMessage} />
      <ChatFooter />
    </div>
  );
}

export default ChatContainer;
