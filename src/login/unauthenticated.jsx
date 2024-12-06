import React, { useState } from 'react';
import FormContainer from '../components/form/formContainer';
import Input from '../components/form/formInput';
import FormButton from '../components/form/formButton';
import FormLink from '../components/form/formLink';
import FormLayout from '../components/form/formLayout';

import '../components/form/formAuthLinks.css'
import '../components/error.css'
import ChatFooter from '../components/chat/chatFooter';
import { AuthState } from './authState';

export function Unauthenticated(props) {
    const [email, setEmail] = useState(props.email || '');
    const [password, setPassword] = useState('');
    const [displayError, setDisplayError] = useState('');
  
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
        setDisplayError('Please fill in both email and password fields.');
        return;
      }
  

      console.log('Login submitted:', { email, password })
      login(props.onLogin);

    };

    async function login(onLogin) {
      const endpoint = `/api/auth/login`;
      try {
        const response = await fetch(endpoint, {
          method: 'post',
          body: JSON.stringify({ email: email, password: password }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
    
        if (response?.status === 200) {
          const body = await response.json();
          localStorage.setItem('email', email);
          onLogin(email, AuthState.Authenticated);
          localStorage.setItem('token', body.token);
        } else {
          const body = await response.json();
          setDisplayError(`⚠ Error: ${body.msg}`);
        }
      } catch (error) {
        setDisplayError('⚠ Network error: Unable to login.');
        console.error('Login failed:', error);
      }
    }
    
    
  
    return (
      <span>
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
          {displayError && <div className="error-message">{displayError}</div>}
        </FormLayout>
      <ChatFooter />          
      </FormContainer>
      
      </span>

    );
  }
  