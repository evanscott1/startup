import React, { useState } from 'react';
import FormContainer from '../components/form/formContainer';
import Input from '../components/form/formInput';
import FormButton from '../components/form/formButton';
import FormLink from '../components/form/formLink';
import FormLayout from '../components/form/formLayout';

import './login.css'

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add login logic
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
  