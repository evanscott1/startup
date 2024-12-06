import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Chat } from '../chat/chat';



export function Authenticated(props) {
  const navigate = useNavigate();


  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('email');
        props.onLogout();
      });
  }

  return (
    <div>
        <Chat logout={() => logout()}></Chat>
    </div>
  );
}
