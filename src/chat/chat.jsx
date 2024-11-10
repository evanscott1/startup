import React from 'react';


export function Chat(props) {



  return (
    <main className='container-fluid bg-secondary text-center'>
      <div>chat displayed here</div>
      <button onClick={props.logout}>
        Logout
      </button>
    </main>
  );
}