import React, { useState } from 'react';
import FormContainer from '../components/form/formContainer';
import Input from '../components/form/formInput';
import FormButton from '../components/form/formButton';
import FormLink from '../components/form/formLink';
import FormLayout from '../components/form/formLayout';

import '../components/form/formAuthLinks.css'
import ChatFooter from '../components/chat/chatFooter';

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
  


      login();

      localStorage.setItem('email', email);
      props.onLogin(email);
      
      console.log('Login submitted:', { email, password });
    };

    async function login() {
      const endpoint = `/api/auth/login`;
      const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
    
      if (response?.status === 200) {
        localStorage.setItem('email', email);
        props.onLogin(email);
      } else {
        const body = await response.json();
        setDisplayError(`⚠ Error: ${body.msg}`);
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
        </FormLayout>
      <ChatFooter />          
      </FormContainer>
      
      </span>

    );
  }
  