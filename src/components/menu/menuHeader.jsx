import React from 'react';

import './menuHeader.css'

function MenuHeader() {
    return (
        <header className="menu-nav">
            <button type="button" id="toggleMenuClose"><i className="material-symbols-outlined"><span className="menu-nav-button">menu</span></i></button>
            <a href="../../../index.html" id="menuOpenNewChat"><i className="material-symbols-outlined"><span className="menu-nav-button">stylus</span></i></a>
        </header>
    );
}

export default MenuHeader;