import React from 'react';

import './formInput.css'

function Input({ type, id, name, placeholder, value, onChange, required, minLength, readOnly }) {
    return (
      <div>
        <label htmlFor={id}>{placeholder}:</label>
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          minLength={minLength}
          readOnly={readOnly}
        />
      </div>
    );
  }
  export default Input;
  