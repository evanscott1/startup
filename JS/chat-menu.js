// Import the utility functions
import { showElement, hideElement, setElementWidth } from './utils.js';

// Select menu DOM elements
const menu = document.querySelector('.menu-container');
const menuClose = document.getElementById('toggleMenuClose');
const menuOpen = document.getElementById('toggleMenuOpen');
const menuOpenNewChat = document.getElementById('menuOpenNewChat');
const menuClosedNewChat = document.getElementById('menuClosedNewChat');

// Select chat DOM elements
const chat = document.querySelector('.chat-container');

// Add event listener for closing the menu
menuClose.addEventListener('click', function () {
    hideElement(menu);
    showElement(menuOpen);
    hideElement(menuClose);
    showElement(menuClosedNewChat);
    hideElement(menuOpenNewChat);
    setElementWidth(chat, '100vw');
    showElement(chat);

});

// Add event listener for opening the menu
menuOpen.addEventListener('click', function () {
    showElement(menu);
    showElement(menuClose);
    hideElement(menuOpen);
    showElement(menuOpenNewChat);
    hideElement(menuClosedNewChat);
    showElement(chat);
    setWidthBasedOnMenu();
});

function setWidthBasedOnMenu() {
    const screenWidth = window.innerWidth;

        switch (true) {
            case (screenWidth < 768):
                setElementWidth(menu, '100vw');

                hideElement(chat);
                break;
            case (screenWidth >= 768 && screenWidth < 1024):
                setElementWidth(chat, '80vw');
                screenWidth(menu, '20vw');
                break;
            case (screenWidth >= 1024):
                setElementWidth(chat, '80vw');
                screenWidth(menu, '20vw');
                break;
            default:
                console.log('Could not get screen width');
                break;
        }

}


