// Import the utility functions
import { showElement, hideElement } from './utils.js';

// Select DOM elements
const menu = document.querySelector('.menu-container');
const menuClose = document.getElementById('toggleMenuClose');
const menuOpen = document.getElementById('toggleMenuOpen');
const menuOpenNewChat = document.getElementById('menuOpenNewChat');
const menuClosedNewChat = document.getElementById('menuClosedNewChat');

// Add event listener for closing the menu
menuClose.addEventListener('click', function() {
  hideElement(menu);
  showElement(menuOpen);
  hideElement(menuClose);
  showElement(menuClosedNewChat)
  hideElement(menuOpenNewChat);
});

// Add event listener for opening the menu
menuOpen.addEventListener('click', function() {
  showElement(menu);
  showElement(menuClose);
  hideElement(menuOpen);
  showElement(menuOpenNewChat)
  hideElement(menuClosedNewChat);
});
