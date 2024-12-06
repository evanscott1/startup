import React, { useState } from 'react';
import FormContainer from '../components/form/formContainer';
import Input from '../components/form/formInput';
import FormButton from '../components/form/formButton';
import FormLink from '../components/form/formLink';
import FormLayout from '../components/form/formLayout';

import '../components/form/formAuthLinks.css'

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    localStorage.setItem('userName', userName);
    props.onLogin(userName);

    // Add your signup logic here (e.g., API call or storing user data)
    create();


    console.log('Signup submitted:', { name, email, password });
  };

  async function create() {
    const endpoint = `http://localhost:4000/api/auth/create`;
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({name: name, email: email, password: password }),
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
    <FormContainer>
      <FormLayout onSubmit={handleSubmit}>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <Input
          type="password"
          id="confirm-password"
          name="confirm-password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={8}
        />
        <FormButton type="submit" label="Sign Up" />
        <div className="form-links">
          <FormLink to='/'>Already have an account?</FormLink>
        </div>
      </FormLayout>
    </FormContainer>
  );
}
