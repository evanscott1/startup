import React from 'react';

import './formButton.css';

function FormButton({ type, label, onClick }) {
    return (
      <button type={type} onClick={onClick} className="userform-button">
        {label}
      </button>
    );
  }
  export default FormButton;
  