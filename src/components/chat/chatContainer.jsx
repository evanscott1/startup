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
    const botMessage = {
      sender: 'Henri', message: 'I\'m happy to help!', isBot: true
    };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const resetChat = () => {
    const defaultMessage = {
      sender: 'Henri', message: 'How can I assist you today?', isBot: true
    };
    setMessages(() => [defaultMessage]);
  }


  return (
    <div className="chat-container">
      <ChatHeader logout={props.logout} onNewChat={resetChat}/>
      <ChatHistory messages={messages}/>
      <ChatInput onSend={addMessage} />
      <ChatFooter />
    </div>
  );
}

export default ChatContainer;
