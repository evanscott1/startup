import React, { useState } from 'react';



import './chatInput.css'

function ChatInput({onSend}) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(input);
    setInput('');
  };

  return (
    <div className="chat-input">
      <textarea
        id="user-input"
        name="user-query"
        placeholder="I'm looking for..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      ></textarea>
      <button type="submit" onClick={handleSubmit}>
        <i id="search-button" className="material-symbols-outlined">search</i>
      </button>
    </div>
  );
}

export default ChatInput;
