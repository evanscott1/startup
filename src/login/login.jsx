import React from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ email, authState, onAuthChange }) {
  return (
    <main>
      <div>
        {authState !== AuthState.Unknown}
        {authState === AuthState.Authenticated && (
          <Authenticated email={email} onLogout={() => onAuthChange(email, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            email={email}
            onLogin={(loginEmail, authState) => {
              onAuthChange(loginEmail, authState);
            }}
          />
        )}
      </div>
    </main>
  );
}
