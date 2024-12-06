import React from 'react';
import { Chat } from '../chat/chat';



export function Authenticated(props) {


  function logout() {
    const token = localStorage.getItem('token');
  
    fetch(`/api/auth/logout`, {
      method: 'delete',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .catch(() => {
        console.error('Logout request failed.');
      })
      .finally(() => {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        props.onLogout();
      });
  }

  return (
    <div>
        <Chat logout={() => logout()}></Chat>
    </div>
  );
}
