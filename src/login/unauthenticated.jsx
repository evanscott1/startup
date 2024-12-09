import React, { useState } from 'react';
import FormContainer from '../components/form/formContainer';
import Input from '../components/form/formInput';
import FormButton from '../components/form/formButton';
import FormLink from '../components/form/formLink';
import FormLayout from '../components/form/formLayout';

import '../components/form/formAuthLinks.css';
import '../components/error.css';
import ChatFooter from '../components/chat/chatFooter';
import { AuthState } from './authState';

export function Unauthenticated(props) {
  const [formMode, setFormMode] = useState('login');
  const [email, setEmail] = useState(props.email || '');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [displayError, setDisplayError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'name') setName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (formMode === 'signup' && !name)) {
      setDisplayError('Please fill in all required fields.');
      return;
    }

    console.log(`${formMode} submitted:`, { email, password, name });

    const endpoint = formMode === 'login' ? '/api/auth/login' : '/api/auth/create';
    await authenticate(endpoint, email, password, name);
  };

  const authenticate = async (endpoint, email, password, name = null) => {
    try {
      const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ email, password, ...(name && { name }) }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (response?.status === 200) {
        const body = await response.json();
        localStorage.setItem('email', email);
        props.onLogin(email, AuthState.Authenticated);
      } else {
        const body = await response.json();
        setDisplayError(`⚠ Error: ${body.msg}`);
      }
    } catch (error) {
      setDisplayError('⚠ Network error: Unable to process request.');
      console.error(error);
    }
  };

  return (
    <div>
      <FormContainer>
        <FormLayout onSubmit={handleSubmit}>
          {formMode === 'signup' && (
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleInputChange}
              required
              aria-label="Name"
            />
          )}
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
            required
            aria-label="Email Address"
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
            aria-label="Password"
          />
          <FormButton type="submit" label={formMode === 'login' ? 'Login' : 'Sign Up'} />
          <div className="form-links">
  {formMode === 'login' ? (
    <span>
      <button
        type="button"
        className="form-link"
        onClick={() => {
          console.log('Switching to signup');
          setFormMode('signup');
        }}
      >
        Sign Up
      </button>
    </span>
  ) : (
    <span>
      <button
        type="button"
        className="form-link"
        onClick={() => {
          console.log('Switching to login');
          setFormMode('login');
        }}
      >
        Login
      </button>
    </span>
  )}
</div>

          {displayError && <div className="error-message">{displayError}</div>}
        </FormLayout>
      </FormContainer>
      <ChatFooter />
    </div>
  );
}
