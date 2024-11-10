import React from 'react';

import './formContainer.css'

function FormContainer({ children }) {
    return (
      <div className="userform-container">
        {children}
      </div>
    );
  }
  export default FormContainer;
  