import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Profile } from './profile/profile';
import { Chat } from './chat/chat';


export default function App() {
    return (
        <BrowserRouter>
            <div className='body bg-dark text-light'>
                <header className='container-fluid'>
                    <nav className='navbar fixed-top navbar-dark'>
                        <div className='navbar-brand'>
                            Henri<sup>&reg;</sup>
                        </div>
                        <menu className='navbar-nav'>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='login'>
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
                </header>

                <main>App components go here</main>

                <Routes>
                    <Route path='/' element={<Login />} exact />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/chat' element={<Chat />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer className='bg-dark text-white-50'>
                    <div className='container-fluid'>
                        <span className='text-reset'>Author Name(s)</span>
                        <a className='text-reset' href='https://github.com/evanscott1/startup'>
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