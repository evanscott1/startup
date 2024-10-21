const userInput = document.getElementById('user-input');

userInput.addEventListener('input', function() {
  // Reset the height to 'auto' to allow shrinking if necessary
  this.style.height = 'auto';
  // Set the height to the scroll height (the full height of the content)
  this.style.height = `${this.scrollHeight}px`;
});
