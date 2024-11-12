import React from 'react';

import './menuButton.css';

function MenuButton({ type, label, onClick }) {
    return (
      <button type={type} onClick={onClick} className="">
        {label}
      </button>
    );
  }
  export default MenuButton;
  