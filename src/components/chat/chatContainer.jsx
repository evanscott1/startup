import React from 'react';
import { useState } from 'react';
import ChatHeader from './chatHeader';
import ChatHistory from './chatHistory';
import ChatInput from './chatInput';
import ChatFooter from './chatFooter';

import './chatContainer.css';

function ChatContainer(props) {
  const defaultMessage =`
  Available commands: \n
  - Enter a keyword to search for a joke.
  - \\o: Order the most recent joke.
  - \\orders: View your past orders.
  - \\clearorders: Clear your past orders.
  - \\help: Show this help message.
    `;

  const [messages, setMessages] = useState([
    { sender: 'Henri', message: defaultMessage, isBot: true },
  ]);
  

  const addMessage = async (newMessage) => {

    setMessages((prevMessages) => [...prevMessages, { sender: 'You', message: newMessage, isBot: false }]);
  
    // Handle special commands
    if (newMessage === '\\o') {
      handleCreateOrder();
    } else if (newMessage === '\\orders') {
      handleListOrders();
    } else if (newMessage === '\\help') {
      handleHelp();
    } else if (newMessage === '\\clearorders') {
      handleClearOrders();
    } else {
      handleJokeSearch(newMessage);
    }
  };
  
  const resetChat = () => {
    const botMessage = {
      sender: 'Henri',
      message: defaultMessage,
      isBot: true,
    };
    setMessages(() => [botMessage]);
  };
  
  const handleHelp = () => {

    
    const botMessage = { sender: 'Henri', message: defaultMessage.trim(), isBot: true };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const handleJokeSearch = async (searchTerm) => {
    // Ensure searchTerm is a string
    if (typeof searchTerm !== "string") {
      const botMessage = { sender: 'Henri', message: 'Invalid input. Please enter a valid search term.', isBot: true };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      return;
    }
  
    const words = searchTerm.trim().split(/\s+/);
  
    // Check for 3-word limit
    if (words.length > 3) {
      const botMessage = { sender: 'Henri', message: 'Please enter no more than 3 words.', isBot: true };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      return;
    }
  
    const response = await fetch(`https://icanhazdadjoke.com/search?term=${encodeURIComponent(searchTerm)}`, {
      headers: { Accept: 'application/json' },
    });
  
    const data = await response.json();
  
    if (data.results.length === 0) {
      const botMessage = { sender: 'Henri', message: 'No jokes found. Please try a different keyword.', isBot: true };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } else {
      const joke = data.results[0].joke;
      const botMessage = { sender: 'Henri', message: joke, isBot: true };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };
  
  
  // Handles creating an order for the last joke
  const handleCreateOrder = async () => {
    const lastBotMessage = messages.filter((msg) => msg.isBot).pop();
  
    if (!lastBotMessage || !lastBotMessage.message) {
      const botMessage = { sender: 'Henri', message: 'No joke to order. Please search for a joke first.', isBot: true };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      return;
    }
  
    const email = localStorage.getItem('email');
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, joke: lastBotMessage.message }),
    });
  
    if (response.ok) {
      const botMessage = { sender: 'Henri', message: 'Order created successfully!', isBot: true };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } else {
      const botMessage = { sender: 'Henri', message: 'Failed to create order. Please try again later.', isBot: true };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };
  
  // Handles listing past orders
  const handleListOrders = async () => {
    const email = localStorage.getItem('email');
    const response = await fetch('/api/orders', {
      method: 'GET',
      headers: {
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      const orderMessages = data.map((order) => `Order ID: ${order.orderId} - Joke: ${order.message}`).join('\n\n');
      const botMessage = { sender: 'Henri', message: orderMessages || 'You have no past orders.', isBot: true };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } else {
      const botMessage = { sender: 'Henri', message: 'Failed to fetch orders. Please try again later.', isBot: true };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };

  const handleClearOrders = async () => {
    const response = await fetch('/api/orders', {
      method: 'DELETE',
      headers: {
      },
    });
  
    if (response.ok) {
      const botMessage = { sender: 'Henri', message: 'Your orders have been cleared.', isBot: true };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } else {
      const botMessage = { sender: 'Henri', message: 'Failed to clear orders. Please try again later.', isBot: true };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };
  


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
