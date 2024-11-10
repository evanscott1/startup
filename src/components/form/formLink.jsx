import React from 'react';
import { NavLink } from 'react-router-dom';

import './formLink.css'

function FormLink({ to, children }) {
  return (
    <NavLink to={to} className="form-link">
      {children}
    </NavLink>
  );
}
export default FormLink;
