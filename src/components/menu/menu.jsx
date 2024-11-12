import React from 'react';
import MenuHeader from './menuHeader';
import ConversationList from './conversationList';

import './menu.css'
import ChatFooter from '../chat/chatFooter';

function Menu() {
  return (
    <div className="menu-container">
      <MenuHeader />
      <div className="menu-container-scroll">
        <ConversationList title="Yesterday" conversations={[{ name: 'School Supplies', link: '/SchoolExample.html' }]} />
        <ConversationList title="Last Week" conversations={[
          { name: 'Birthday Gifts for Nephew', link: '/GiftExample.html' },
          { name: 'Waterbottle Shopping', link: '/Waterbottle.html' }
        ]} />
      </div>
    </div>
  );
}

export default Menu;
