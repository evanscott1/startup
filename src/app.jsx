import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Profile } from './profile/profile';
import { AuthState } from './login/authState';


export default function App() {
    const [email, setEmail] = React.useState(localStorage.getItem('email') || '');
    const currentAuthState = email ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);


    return (
        <BrowserRouter>
            <div >
                {/* <header>
                    <nav className='navbar fixed-top navbar-dark'>
                        <div className='navbar-brand'>
                            Henri<sup>&reg;</sup>
                        </div>
                        <menu className='navbar-nav'>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to=''>
                                    Login
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='signup'>
                                    Signup
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='profile'>
                                    Profile
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='chat'>
                                    Chat
                                </NavLink>
                            </li>
                        </menu>
                    </nav>
                </header> */}

                <Routes>
                <Route
            path='/'
            element={
              <Login
                email={email}
                authState={authState}
                onAuthChange={(email, authState) => {
                  setAuthState(authState);
                  setEmail(email);
                }}
              />
            }
            exact
          />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer>
                    <div>
                        <span>Author Name(s)</span>
                        <a href='https://github.com/evanscott1/startup'>
                            Source
                        </a>
                    </div>
                </footer>
            </div>
        </BrowserRouter>

    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}