import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { AuthState } from './login/authState';


export default function App() {
    const [email, setEmail] = React.useState(localStorage.getItem('email') || '');
    const [token, setToken] = React.useState(localStorage.getItem('token'))
    const currentAuthState = token ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);


    return (
        <BrowserRouter>
            <div >

                <Routes>
                <Route
            path='/'
            element={
              <Login
                email={email}
                authState={authState}
                onAuthChange={(email, authState) => {
                    setAuthState(authState ?? AuthState.Unauthenticated);
                    setEmail(email);
                  }}
              />
            }
            exact
          />
                    <Route path='*' element={<NotFound />} />
                </Routes>


            </div>
        </BrowserRouter>

    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}