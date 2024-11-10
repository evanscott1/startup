import React, { useState } from 'react';
import FormContainer from '../components/form/formContainer';
import Input from '../components/form/formInput';
import FormButton from '../components/form/formButton';
import FormLink from '../components/form/formLink';
import FormLayout from '../components/form/formLayout';

import '../components/form/formAuthLinks.css'

export function Unauthenticated(props) {
    const [email, setEmail] = useState(props.email || '');
    const [password, setPassword] = useState('');
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === 'email') {
        setEmail(value);
      } else if (name === 'password') {
        setPassword(value);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted');
      if (!email || !password) {
        alert('Please fill in both email and password fields.');
        return;
      }
  
      localStorage.setItem('email', email);
      props.onLogin(email);
    };
  
    return (
      <FormContainer>
        <FormLayout onSubmit={handleSubmit}>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
            required
          />
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
            required
            minLength={8}
          />
          <FormButton type="submit" label="Login" />
          <div className='form-links'>
            <FormLink to="/forgot-password">Forgot Password?</FormLink>
            <FormLink to="/signup">Sign Up</FormLink>
          </div>
        </FormLayout>
      </FormContainer>
    );
  }
  