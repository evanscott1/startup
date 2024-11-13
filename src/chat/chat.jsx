import React from 'react';
import Menu from '../components/menu/menu';
import ChatContainer from '../components/chat/chatContainer';

import './chat.css'

export function Chat(props) {
  return (
    <main id="chat-page">
      <Menu />
      <ChatContainer logout={props.logout}/>
    </main>
  );
}


      // <button onClick={props.logout}>
      //   Logout
      // </button>