#Github
##Markdown Language

There is formal syntax.

A README.md file describes the modifications and altercations made to an application.

An AWS instance can be created to access a server computer. Created an private key to access the server.

An elastic IP address can then be assigned to the instance so that the IP address remains constant.

With a constant IP address, a domain name can be assigned.

DNS records allow a web URL to direct traffic to a specific IP address. This allows for the addition
of more secure web protocols that are not available to an IP address on its own.

Can use Caddy which will connect with Let's Encrypt to create a web certificate to allow HTTPS.

The console terminal can be used to do a lot of really helpful changes to files and do so quickly.

HTML is about structuring a web page and providing content.

CSS is used to style web pages.

HTML can be used to create forms that accept user data and send it to a server.

Caddy can be used to direct domain name traffice to a specific subdomain that accesses a service directory on the server.

CSS Flex allows organizing elements within a code block as either a row or a column.

###Additional Midterm Prep notes

1. In the following code, what does the link element do?
The <link> element in HTML is used to link external resources to the HTML document, commonly used for linking stylesheets.

Example:

html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
In this example, the <link> element links the external styles.css file to the HTML document, which contains the CSS rules that will style the webpage.

2. In the following code, what does a div tag do?
A <div> tag in HTML is a block-level element that is used as a container for grouping other elements. It has no semantic meaning but is commonly used for layout purposes.

Example:

html
<div>
  <p>This is a paragraph inside a div.</p>
  <button>Click me</button>
</div>
In this example, the <div> groups a paragraph and a button together.

3. In the following code, what is the difference between the #title and .grid selector?
The #title selector is an ID selector, which targets an element with a specific ID.
The .grid selector is a class selector, which targets elements that have a certain class.
Example:

html
<div id="title">This is a title</div>
<div class="grid">Grid container 1</div>
<div class="grid">Grid container 2</div>
css
#title {
  font-size: 24px;
  font-weight: bold;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
In this example:

#title styles the element with the id="title" to make the text bold and larger.
.grid applies grid styling to all elements with the class grid.
4. In the following code, what is the difference between padding and margin?
Padding is the space between the content and the element’s border.
Margin is the space outside the element’s border, affecting the distance between the element and other elements.
Example:

html
<div class="box">Content inside a box</div>
css
.box {
  padding: 20px;  /* Space between the content and the border */
  margin: 30px;   /* Space outside the border */
  border: 1px solid black;
}
In this example, padding adds space inside the box around the content, while margin adds space outside the box between it and other elements.

5. Given this HTML and this CSS, how will the images be displayed using flex?
Let's assume we have a basic HTML structure with images inside a flex container. The images will be arranged according to the flexbox properties defined in the CSS.

Example:

html
<div class="flex-container">
  <img src="image1.jpg" alt="Image 1">
  <img src="image2.jpg" alt="Image 2">
  <img src="image3.jpg" alt="Image 3">
</div>
css
.flex-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
}

img {
  width: 100px;
  height: auto;
}
In this example:

The images will be displayed in a row (default flex direction) because the flex-container has display: flex.
justify-content: space-around will space the images evenly across the container.
align-items: center will vertically align the images in the center of the container.
The gap: 20px will add a 20-pixel space between the images.

6. What does the following padding CSS do?
Padding in CSS adds space inside an element, between the content and the element's border. If the question involves specific values for padding (e.g., padding: 10px 20px;), here's what it does:

Example:

css
.box {
  padding: 10px 20px;
}
In this example:

10px is applied to the top and bottom of the .box.
20px is applied to the left and right of the .box.
Padding can be specified for individual sides, or all sides at once, depending on the shorthand values.

7. What does the following code using arrow syntax function declaration do?
An arrow function is a more concise way to write function expressions in JavaScript.

Example:

javascript
const add = (a, b) => a + b;
console.log(add(3, 4));
In this example:

add is a function that takes two arguments (a and b) and returns their sum.
The code will output 7 because it calculates 3 + 4.
Arrow functions have a few key characteristics:

They are anonymous (no name by default).
They have a more concise syntax.
They do not bind their own this value, instead, they inherit it from the surrounding context.
8. What does the following code using map with an array output?
The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.

Example:

javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num => num * 2);
console.log(doubled);
In this example:

The map() method multiplies each element in the numbers array by 2.
The output will be [2, 4, 6, 8].
The map() method transforms each item in the original array, and the result is stored in a new array.

9. What does the following code output using getElementByID and addEventListener?
The getElementByID() method returns the element that has the ID attribute with the specified value, and addEventListener() attaches an event handler to an element.

Example:

html
<button id="myButton">Click me</button>
javascript
document.getElementById("myButton").addEventListener("click", () => {
  console.log("Button clicked!");
});
In this example:

When the button with the ID myButton is clicked, it will log the message "Button clicked!" to the console.
The code adds a click event listener to the button that triggers the log message when the button is clicked.
10. What does the following line of JavaScript do using a # selector?
In CSS and JavaScript, the # selector refers to an element by its ID. JavaScript uses the document.querySelector() method to select an element by its ID when using the # selector.

Example:

javascript
const element = document.querySelector("#myElement");
console.log(element.textContent);
In this example:

document.querySelector("#myElement") selects the element with the ID myElement.
textContent returns the text content of that element, which is then logged to the console.
The # selector is used in querySelector() to target elements by their ID.

11. Which of the following are true? (mark all that are true about the DOM)
The Document Object Model (DOM) is a programming interface for HTML and XML documents. Here are some key truths about the DOM:

The DOM represents a document as a tree structure.

This is true. The document is represented as nodes organized in a tree hierarchy, where each element, attribute, and text is a node.
The DOM allows JavaScript to manipulate elements on the page.

This is true. JavaScript can modify the DOM to change the structure, style, and content of the web page dynamically.
The DOM reflects the structure of the HTML document in the browser.

This is true. The DOM is an in-memory representation of the HTML, which reflects how the browser interprets the HTML document.
You can use the DOM to access and change styles, structure, and attributes of elements.

This is true. The DOM allows manipulation of an element’s CSS styles, attributes, and even the structure of the document itself (e.g., adding/removing nodes).
12. By default, the HTML span element has a default CSS display property value of:
The default CSS display value for a span element is inline.

Example:

html
<span>This is an inline element.</span>
Explanation:

span elements are inline by default, meaning they do not start on a new line and only take up as much width as necessary.
13. How would you use CSS to change all the div elements to have a background color of red?
You can target all div elements in CSS by using the div selector and setting the background-color property.

Example:

css
div {
  background-color: red;
}
In this example, all div elements on the page will have a red background.

14. How would you display an image with a hyperlink in HTML?
To display an image with a hyperlink, you wrap an <img> tag inside an <a> tag.

Example:

html
<a href="https://www.example.com">
  <img src="image.jpg" alt="Description of image">
</a>
In this example:

The image (image.jpg) will act as a hyperlink, and when clicked, it will navigate to https://www.example.com.
15. In the CSS box model, what is the ordering of the box layers starting at the inside and working out?
The CSS box model layers are ordered as follows (from the inside to the outside):

Content – The actual content of the element (text, image, etc.).
Padding – Space between the content and the border.
Border – The border that surrounds the padding (optional, can be visible or hidden).
Margin – Space outside the border that separates the element from neighboring elements.
Visual reference:

css
.element {
  margin: 20px;
  border: 5px solid black;
  padding: 10px;
}
In this example, the content is surrounded by 10px of padding, a 5px solid border, and 20px of margin.

16. Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?
To achieve this, you would need to wrap the word "trouble" in a separate element, such as a <span>, and apply CSS to that element only.

Example HTML:

html
<p><span class="green-text">trouble</span>double</p>
CSS:

css
.green-text {
  color: green;
}
Explanation:

The CSS targets the span with the class green-text and changes the text color to green. The word "double" remains unaffected because it is not wrapped in the span.
17. What will the following code output when executed using a for loop and console.log?
Let’s assume an example of a for loop in JavaScript:

Example:

javascript
for (let i = 0; i < 3; i++) {
  console.log(i);
}
Output:

0
1
2
Explanation:

The for loop starts with i = 0 and increments i until it is no longer less than 3. The console.log(i) prints the current value of i during each iteration of the loop.
18. How would you use JavaScript to select an element with the ID of "byu" and change the text color of that element to green?
You can use document.getElementById() or document.querySelector() to select the element by its ID and then change its text color.

Example:

javascript
document.getElementById("byu").style.color = "green";
Or using querySelector:

javascript
document.querySelector("#byu").style.color = "green";
Explanation:

This code selects the element with the ID byu and changes its color style property to green.
19. What is the opening HTML tag for a paragraph, ordered list, unordered list, second-level heading, first-level heading, and third-level heading?
Here are the correct opening tags for each element:

Paragraph: <p>
Ordered List: <ol>
Unordered List: <ul>
Second-level Heading: <h2>
First-level Heading: <h1>
Third-level Heading: <h3>
Example:

html
<p>This is a paragraph.</p>
<ol>
  <li>First item</li>
  <li>Second item</li>
</ol>
<ul>
  <li>Item one</li>
  <li>Item two</li>
</ul>
<h1>This is a first-level heading</h1>
<h2>This is a second-level heading</h2>
<h3>This is a third-level heading</h3>
20. How do you declare the document type to be HTML?
The document type declaration (DOCTYPE) is placed at the very beginning of the HTML document to tell the browser which version of HTML is being used. For HTML5, the declaration is:

html
<!DOCTYPE html>
Explanation:

The <!DOCTYPE html> declaration is the standard declaration for HTML5 and must be the very first line of the document before the <html> tag.

21. What is valid JavaScript syntax for if, else, for, while, and switch statements?
Here is the valid syntax for each of the statements:

if statement:
javascript
if (condition) {
  // code to run if condition is true
}
else statement:
javascript
if (condition) {
  // code to run if condition is true
} else {
  // code to run if condition is false
}
for loop:
javascript
for (let i = 0; i < 5; i++) {
  // code to run for each iteration
}
while loop:
javascript
while (condition) {
  // code to run while condition is true
}
switch statement:
javascript
switch (expression) {
  case value1:
    // code to run if expression === value1
    break;
  case value2:
    // code to run if expression === value2
    break;
  default:
    // code to run if no cases match
}
22. What is the correct syntax for creating a JavaScript object?
The correct syntax for creating a JavaScript object is using curly braces {} to define key-value pairs.

Example:

javascript
const animal = {
  type: "bird",
  name: "crow",
  sound: "caw"
};
Explanation:

This creates an object animal with properties type, name, and sound.
23. Is it possible to add new properties to JavaScript objects?
Yes, it is possible to add new properties to existing JavaScript objects.

Example:

javascript
const animal = { type: "bird" };
animal.name = "crow";  // Adding a new property 'name'
console.log(animal.name);  // Output: "crow"
Explanation:

You can add a new property (name) to the animal object after it is created.
24. If you want to include JavaScript on an HTML page, which tag do you use?
To include JavaScript on an HTML page, you use the <script> tag.

Example:

html
<script src="script.js"></script>  <!-- External script -->
Or for inline JavaScript:

html
<script>
  console.log("Hello, world!");
</script>
Explanation:

The <script> tag is used to either embed JavaScript directly in the HTML document or to reference an external JavaScript file.
25. Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?
Example HTML:

html
<p><span id="animal">animal</span> fish</p>
To change the text "animal" to "crow", you would use getElementById or querySelector to select the element with the ID animal, and then set its textContent.

JavaScript:

javascript
document.getElementById("animal").textContent = "crow";
Or using querySelector:

javascript
document.querySelector("#animal").textContent = "crow";
Explanation:

The JavaScript selects the span element with the ID animal and changes its text to "crow", leaving the "fish" text unaffected.


Here are the answers to your next set of questions:

26. Which of the following correctly describes JSON?
JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate. It is commonly used for transmitting data between a server and a web application.

Here are key points about JSON:

Data is represented as key-value pairs.
Keys must be strings enclosed in double quotes.
Values can be strings, numbers, arrays, objects, booleans, or null.
The data is stored in plain text format.
JSON is language-independent but is easily parsed in many programming languages.
Example:

json
{
  "name": "John",
  "age": 30,
  "isStudent": false,
  "hobbies": ["reading", "music"]
}
27. What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo do?
Here’s what each console command does:

chmod: Changes the permissions of a file or directory.

Example: chmod 755 file.txt
pwd: Prints the current working directory.

Example: Running pwd in a terminal might output /home/user.
cd: Changes the current directory.

Example: cd /home/user moves into the /home/user directory.
ls: Lists the contents of a directory.

Example: ls displays the files and folders in the current directory.
vim: Opens the vim text editor.

Example: vim file.txt opens file.txt in vim.
nano: Opens the nano text editor.

Example: nano file.txt opens file.txt in nano.
mkdir: Creates a new directory.

Example: mkdir new_folder creates a directory named new_folder.
mv: Moves or renames a file or directory.

Example: mv file.txt /home/user moves file.txt to the /home/user directory.
rm: Removes a file or directory.

Example: rm file.txt deletes file.txt.
man: Displays the manual page for a command.

Example: man ls shows the manual for the ls command.
ssh: Connects to a remote server via Secure Shell (SSH).

Example: ssh user@hostname starts an SSH session with hostname.
ps: Displays information about running processes.

Example: ps lists the processes running in the current shell.
wget: Downloads files from the web.

Example: wget http://example.com/file.zip downloads file.zip from example.com.
sudo: Executes a command with superuser (administrator) privileges.

Example: sudo apt-get update updates the package list with superuser privileges.
28. Which of the following console commands creates a remote shell session?
The command that creates a remote shell session is ssh.

Example:

bash
ssh user@remote_host
Explanation:

ssh (Secure Shell) is used to securely log into a remote system and start a session where you can execute commands as if you were sitting at the remote machine.
29. Which of the following is true when the -la parameter is specified for the ls console command?
The -la parameter for the ls command means:

l: List files in long format, showing detailed information like permissions, owner, size, and modification date.
a: Show all files, including hidden files (those starting with a .).
Example:

bash
ls -la
This will output a detailed list of all files, including hidden files, in the directory.

30. Which of the following is true for the domain name banana.fruit.bozo.click, which is the top-level domain, which is a subdomain, which is a root domain?
Top-Level Domain (TLD): .click is the top-level domain.
Subdomain: banana.fruit is the subdomain (this includes multiple levels of subdomains: banana is a subdomain of fruit, and fruit is a subdomain of the root).
Root Domain: bozo.click is the root domain, which includes the domain name bozo and the TLD .click.
Explanation:

The root domain is the domain name and the top-level domain (e.g., bozo.click).
The subdomain is everything before the root domain (e.g., banana.fruit).

31. Is a web certificate necessary to use HTTPS?
Yes, a web certificate is necessary to use HTTPS.

Explanation:

HTTPS (Hypertext Transfer Protocol Secure) is the secure version of HTTP. It uses SSL/TLS encryption to protect the communication between the browser and the server. For a website to serve content over HTTPS, it must have an SSL/TLS certificate installed, which is issued by a Certificate Authority (CA).
Without a valid certificate, browsers will warn users that the connection is not secure, and HTTPS won’t work properly.
32. Can a DNS A record point to an IP address or another A record?
A DNS A record can only point to an IP address, not another A record.

Explanation:

A DNS A (Address) record maps a domain name to an IP address (IPv4). It cannot point to another A record directly.
To achieve functionality similar to pointing to another A record, you would use a CNAME record (Canonical Name), which points one domain name to another domain name.
33. Port 443, 80, 22 is reserved for which protocol?
Here is the mapping of ports to their respective protocols:

Port 443: HTTPS (Hypertext Transfer Protocol Secure)
Port 80: HTTP (Hypertext Transfer Protocol)
Port 22: SSH (Secure Shell)
Explanation:

Port 443 is the standard port for HTTPS, which ensures secure communication over SSL/TLS.
Port 80 is used for standard HTTP traffic.
Port 22 is used for SSH, which allows secure remote login to a computer.
34. What will the following code using Promises output when executed?
Let’s assume an example of code using Promises. Here’s a typical example:

Example:

javascript
const myPromise = new Promise((resolve, reject) => {
  let success = true;
  
  if (success) {
    resolve("Promise fulfilled!");
  } else {
    reject("Promise rejected.");
  }
});

myPromise.then(result => {
  console.log(result);
}).catch(error => {
  console.log(error);
});
Output:

javascript
Promise fulfilled!
Explanation:

The promise checks the value of the success variable, which is set to true. Since success is true, the promise resolves and calls the .then() method, outputting "Promise fulfilled!" to the console.
If the promise had been rejected (e.g., if success = false), it would have outputted the rejection message "Promise rejected." via the .catch() method.
