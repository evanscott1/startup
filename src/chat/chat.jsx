import React from 'react';
import Menu from '../components/menu/menu';
import ChatContainer from '../components/chat/chatContainer';

export function Chat() {
  return (
    <main id="chat-page">
      <Menu />
      <ChatContainer />
    </main>
  );
}


      // <button onClick={props.logout}>
      //   Logout
      // </button>