import React from 'react';

import FormContainer from '../components/form/formContainer';
import FormLayout from '../components/form/formLayout';
import Input from '../components/form/formInput';
import FormLink from '../components/form/formLink';
import FormButton from '../components/form/formButton';

import './profile.css'

export function Profile({onLogout}) {

  const email = localStorage.getItem('email') || '';

  const handleSubmit = () => {
    console.log("Submitted.");
  }

  const handleChange = () => {
    console.log("Submitted.");
  }


  return (
<span>
        <h3 className='title'>Profile</h3>
        <FormLayout onSubmit={handleSubmit}>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            required
            readOnly
          />
          <FormButton type="submit" label="Update" />

          <button className='logout' type='button' onClick={onLogout}>Logout</button>
        </FormLayout>
        <h4 className='title'>Notifications:</h4>
        <h5 className='title'>Your order was shipped!</h5>
</span>





  );
}