import React from 'react';
import { NavLink } from 'react-router-dom';

import './chatHeader.css'

function ChatHeader(props) {
    return (
        <header className="chat-header">
            {/* Menu Disabled */}
            {/* <div className="closedMenuContainer">
                <button type="button" id="toggleMenuOpen"><i className="material-symbols-outlined"><span className="closedMenuContainer-button">menu</span></i></button>
                <a href="#" id="menuClosedNewChat"><i className="material-symbols-outlined"><span className="closedMenuContainer-button">stylus</span></i></a>
            </div> */}


            <button type='button' onClick={props.onNewChat}>
                <i className="material-symbols-outlined">stylus</i>
            </button>

            <a className="header-button" id="chat-header-henri" href="../../../index.html">Henri</a>

            <div id="header-icons">

                {/* <a className="header-button" id="chat-header-profile" href="../UserLogin.html"><i
                    className="material-symbols-outlined"><span className="closedMenuContainer-button">account_circle</span></i></a> */}
                {/* <a className="header-button" id="chat-header-login" href="../UserLogin.html">Log out</a> */}
                <button type='button' onClick={props.logout}>
                <i className="material-symbols-outlined">account_circle</i>
                </button>

                {/* <a className="header-button" id="chat-header-signup" href="../UserSignup.html">Sign
                    Up</a> */}
            </div>
        </header>
    );
}

export default ChatHeader;