import React from 'react';

import './formLayout.css'

function FormLayout({ children, onSubmit }) {
    return (
      <form className="userform-form" onSubmit={onSubmit}>
        {children}
      </form>
    );
  }
  export default FormLayout;
  