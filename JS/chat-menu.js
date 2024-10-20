// Import the utility functions
import { showElement, hideElement, setElementWidth } from './utils.js';

// Select menu DOM elements
const menu = document.querySelector('.menu-container');
const menuClose = document.getElementById('toggleMenuClose');
const menuOpen = document.getElementById('toggleMenuOpen');
const menuOpenNewChat = document.getElementById('menuOpenNewChat');
const menuClosedNewChat = document.getElementById('menuClosedNewChat');
let isMenuOpen = undefined;
checkMenuDefault();

// Select chat DOM elements
const chat = document.querySelector('.chat-container');

let previousCategory = getScreenSizeCategory();

function getScreenSizeCategory() {
    const screenWidth = window.innerWidth;
  
    if (screenWidth < 786) {
      return 'mobile';
    } else if (screenWidth < 1024) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }


function checkMenuDefault() {
    const screenWidth = window.innerWidth;
    switch (true) {
        case (screenWidth < 768):
            isMenuOpen = false;
            break;
        case (screenWidth >= 768 && screenWidth < 1024):
            isMenuOpen = false;
            break;
        case (screenWidth >= 1024):
            isMenuOpen = true;
            break;
        default:
            console.log('Could not get screen width');
            break;
    }
}

// Add event listener for closing the menu
menuClose.addEventListener('click', closeMenu);

// Add event listener for opening the menu
menuOpen.addEventListener('click', openMenu);

function closeMenu() {
    isMenuOpen = false;
    hideElement(menu);
    showElement(menuOpen);
    hideElement(menuClose);
    showElement(menuClosedNewChat);
    hideElement(menuOpenNewChat);
    setElementWidth(chat, '100vw');
    showElement(chat);
}

function openMenu() {
    isMenuOpen = true;
    showElement(menu);
    showElement(menuClose);
    hideElement(menuOpen);
    showElement(menuOpenNewChat);
    hideElement(menuClosedNewChat);
    showElement(chat);
    setWidthBasedOnMenu();
}

function setWidthBasedOnMenu() {
    const currentCategory = getScreenSizeCategory();

        switch (currentCategory) {
            case ('mobile'):
                setElementWidth(menu, '100vw');
                hideElement(chat);
                break;
            case ('tablet'):
                setElementWidth(chat, '80vw');
                setElementWidth(menu, '20vw');
                break;
            case ('desktop'):
                setElementWidth(chat, '80vw');
                setElementWidth(menu, '20vw');
                break;
            default:
                console.log('Could not get screen width');
                break;
        }

}

function handleResize() {
    const currentCategory = getScreenSizeCategory();
  
    // Check if the category has changed
    if (currentCategory !== previousCategory) {

  
      if (currentCategory === 'desktop') {
        openMenu();
      } else if (currentCategory === 'tablet') {
        closeMenu();
      } else {
        closeMenu();
      }
  
      // Update the previous category after handling resize
      previousCategory = currentCategory;
    }
  }

window.addEventListener('resize', handleResize);
