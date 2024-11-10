import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Chat } from '../chat/chat';



export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userName');
    props.onLogout();
  }

  return (
    <div>
        <Chat logout={() => logout()}></Chat>
    </div>
  );
}
