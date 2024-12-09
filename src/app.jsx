import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { AuthState } from './login/authState';

export default function App() {
  const [email, setEmail] = React.useState(localStorage.getItem('email') || '');
  const [authState, setAuthState] = React.useState(AuthState.Unknown); // Start with Unknown state

  // Check authentication status on app load
  React.useEffect(() => {
    async function checkAuthentication() {
      try {
        const response = await fetch('/api/auth/status', {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          if (data.authenticated && data.email) {
            setAuthState(AuthState.Authenticated);
            setEmail(data.email);
            localStorage.setItem('email', data.email);
          } else {
            setAuthState(AuthState.Unauthenticated);
            setEmail('');
            localStorage.removeItem('email');
          }
        } else {
          setAuthState(AuthState.Unauthenticated);
          setEmail('');
          localStorage.removeItem('email');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setAuthState(AuthState.Unauthenticated);
        setEmail('');
        localStorage.removeItem('email');
      }
    }

    checkAuthentication();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                email={email}
                authState={authState}
                onAuthChange={(newEmail, newAuthState) => {
                  setAuthState(newAuthState ?? AuthState.Unauthenticated);
                  setEmail(newEmail);
                  if (newEmail) {
                    localStorage.setItem('email', newEmail);
                  } else {
                    localStorage.removeItem('email');
                  }
                }}
              />
            }
            exact
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}
