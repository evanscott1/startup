import React, { useState, useEffect } from 'react';
import ChatHeader from './chatHeader';
import ChatHistory from './chatHistory';
import ChatInput from './chatInput';
import ChatFooter from './chatFooter';
import { orderNotifier } from './orderNotifier';

import './chatContainer.css';

function ChatContainer(props) {
  const defaultMessage = `
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

  // Set up orderNotifier for WebSocket communication
  useEffect(() => {
    const handleOrderUpdate = (event) => {
      const botMessage = {
        sender: 'Henri',
        message: event.message,
        isBot: true,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    };

    orderNotifier.addHandler(handleOrderUpdate);

    return () => {
      orderNotifier.removeHandler(handleOrderUpdate);
    };
  }, []);

  const addMessage = async (newMessage) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'You', message: newMessage, isBot: false },
    ]);

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
    const botMessage = {
      sender: 'Henri',
      message: defaultMessage.trim(),
      isBot: true,
    };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const handleJokeSearch = async (searchTerm) => {
    if (typeof searchTerm !== 'string') {
      const botMessage = {
        sender: 'Henri',
        message: 'Invalid input. Please enter a valid search term.',
        isBot: true,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      return;
    }

    const words = searchTerm.trim().split(/\s+/);

    if (words.length > 3) {
      const botMessage = {
        sender: 'Henri',
        message: 'Please enter no more than 3 words.',
        isBot: true,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      return;
    }

    const response = await fetch(
      `https://icanhazdadjoke.com/search?term=${encodeURIComponent(searchTerm)}`,
      {
        headers: { Accept: 'application/json' },
      }
    );

    const data = await response.json();

    if (data.results.length === 0) {
      const botMessage = {
        sender: 'Henri',
        message: 'No jokes found. Please try a different keyword.',
        isBot: true,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } else {
      const joke = data.results[0].joke;
      const botMessage = { sender: 'Henri', message: joke, isBot: true };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };

  // Handles creating an order for the last joke
  const handleCreateOrder = () => {
    const lastBotMessage = messages.filter((msg) => msg.isBot).pop();

    if (!lastBotMessage || !lastBotMessage.message) {
      const botMessage = {
        sender: 'Henri',
        message: 'No joke to order. Please search for a joke first.',
        isBot: true,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      return;
    }

    const orderId = Date.now().toString(); // Unique ID for the order
    const orderDetails = { joke: lastBotMessage.message };
    orderNotifier.placeOrder(orderId, orderDetails);

    const botMessage = {
      sender: 'Henri',
      message: 'Order created successfully!',
      isBot: true,
    };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  return (
    <div className="chat-container">
      <ChatHeader logout={props.logout} onNewChat={resetChat} />
      <ChatHistory messages={messages} />
      <ChatInput onSend={addMessage} />
      <ChatFooter />
    </div>
  );
}

export default ChatContainer;
