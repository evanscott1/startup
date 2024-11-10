import React from 'react';

import './formLayout.css'

function FormLayout({ children }) {
    return (
      <form className="userform-form">
        {children}
      </form>
    );
  }
  export default FormLayout;
  