# Henri

Henri helps retail customers find the exact product they need using an online digital shopping assistant. Leveraging AI, Henri not only organizes products into a digital directory but also makes intelligent, context-aware recommendations. The traditional search bar is outdated—Henri ushers in the era of the digital shopping assistant.

## Overview

Henri addresses the challenges faced by both vendors and customers in the retail market by enhancing product listings and transforming the shopping experience. By integrating advanced AI models, Henri empowers users with smart recommendations and personalized shopping journeys, making it easier than ever to find the right product at the right time.

## Specification Deliverable

### Elevator Pitch

Have you ever struggled with poorly presented product listings or spent hours trying to find the right product online? Henri is here to change that. Our digital shopping assistant replaces the need for offsite research by asking the right questions, understanding your needs, and providing personalized recommendations. With Henri, finding the perfect product is no longer a guessing game—it’s a seamless experience.

### Design
A simple overview of the application's atchitecture.

![A website design flow chart on a whiteboard](./Assets/Notes/2024-08-29_HenriApplicationDesign.jpg)

The architecture creates a tailored shopping experience for customers, all powered by AI and machine learning algorithms. While this design and project will be focused on developing the core features of Henri, there will be many opportunities to add and enhance the application in the future.

## Key Features

- **Context-Aware Recommendations**: Shopping assistant asks insightful questions to refine search prompts and enhance product discovery.
- **Community-Driven Insights**: Recommendations are enriched with reviews and feedback from the community.

## Technologies

Henri utilizes a range of modern technologies to deliver a unique shopping experience:

- **HTML & CSS**: Structured pages with responsive design tailored for both desktop and mobile users.
- **React**: Component-driven architecture for dynamic, interactive interfaces.
- **Service**: Powers the shopping assistant’s recommendation engine, utilizing natural language processing (NLP) to understand and respond to customer needs. Backend service with endpoints for:
    - login
    - NLP processing
    - search processing
    - collecting feedback
- **Database Integration**: Manages user profiles, product details, and interaction data securely.
- **WebSocket**: Provides real-time customer service chats.

## HTML Deliverable

### Design
The design was slightly modified to accomodate the requirements of the HTML deliverable. Some pages were added, some discarded. It's likely that in the future that page utility will be combined into a single user interface under index.html.

![HTML page design on a whiteboard](./Assets/Notes/2024-09-26_HenriHtmlDesign.jpg)

### Details

- [x] **HTML Pages**: Varios HTML pages displaying 3rd party services and database information:
    - An index landing page with an example of the inputs and outputs that will be provided by the LLM.
    - User pages focused on user forms required to track and display user data.
    - Vendor pages focused on vendor forms required to track and display product data.
    - An About Me page that give a brief description of the website and a contact submission form.
- [x] **Links**: A rudimentary nav bar with links to various core pages- accessible from every page. A rudimentary user bar that has a login/username link. Some pages have static links in the body to relevant database information- these links will be dynamic in the future.
- [x] **Text**: Static example and filler text on various pages representing database information- these texts will be dynamic in the future.
- [x] **Images**: Added an example product image to the product page. Added the Henri logo to each page.
- [x] **DB/Login**: Login page for users with a login form and submit button. Various other forms to modify DB data.
- [x] **WebSocket**: The count of inventory amounts to ensure that customers do not purchase out of stock items.

## CSS Deliverable

### Design
    https://colorhunt.co/palette/d6efd880af81508d4e1a5319
    TODO: Optimize for mobile.

### Details

- [x] **Header, footer, and main content body**: Present and accounted for.
- [x] **Navigation elements**: All styled and functional.
- [x] **Responsive to window resizing**: Still needs work to be mobile optimized. Has some resizing, but that's based on vh and vw, witch doesn't translate well to certain screen sizes.
- [x] **Application elements**: Core user features are styled. I believe some need JS/React to fully enable. 
- [x] **Application text content**: Standard font across the app.
- [x] **Application images**: Removed images that were previously used-- these will be brought back eventually when the database is able to hold them instead of the Github Repo. Created CSS based logo. Will need to design an image based logo for the tab image.

## React Deliverable

### Design
    TODO: Add a shopping list feature in the bottom right corner of the chat. Make collapsable and allow result elements to be dragged and added to the list.
    TODO: Optimize for mobile.
### Details

- [x] **Bundled and transpiled**: Added packages for React using the Vite setup.
- [x] **Components**: Organized page features into reusable components. Removed chat history to reduce scope of project. Was going to require a lot more storage.
    - [x] **login**: Setup pseudo authorization using local storage.
    - [x] **database**: Setup pseudo database using local storage.
    - [x] **WebSocket**: Notifications placeholder. Will be used to notify customers of order status.
    - [x] **application logic**: Will process chat messages to format appropriately. Need to learn more about the format of OpenAI API responses before implementing.
- [x] **Router**: Router setup for login(auth).
- [x] **Hooks**: Hooks used as appropriate for dynamic content.

## Service Deliverable 

### Design

### Details

- [x] **Node.js/Express HTTP service**: Set up a backend using Node.js and Express to handle HTTP requests and support the eCommerce platform's functionalities.
- [x] **Static middleware for frontend**: Implemented middleware to serve static files for the frontend.
- [x] **Calls to third party endpoints**: Integrated Dad Jokes API to act as inventory for the store.
- [x] **Backend service endpoints**: Developed endpoints for making and managing tracking customer orders. As well as user account management.
- [x] **Frontend calls service endpoints**: Ensured the frontend interacts with backend services to fetch product data, manage orders, and process customer queries.


## DB/Login Deliverable

### Design
The project uses MongoDB as the persistent data store for managing user authentication and associated data. The database is hosted on a cloud database, providing a scalable and secure solution. User login and registration workflows interact with the database to store credentials and limit functionality based on authentication status.

### Details
- [x] **MongoDB Atlas database created**: A MongoDB Atlas cluster has been created to host the database.
- [x] **Stores data in MongoDB**: User information, including credentials and session tokens, is stored persistently in MongoDB collections.
- [x] **User registration**: New users can register by providing their name, email, and password. Credentials are stored in MongoDB, with hashing applied to the password.
- [x] **Existing user**: The system validates existing users by checking their credentials against the stored values in MongoDB during login.
- [x] **Creating/Getting orders**: Front-end allows for creation and retrieval of orders by an authenticated user.
- [x] **Use MongoDB to store credentials**: The database stores user credentials, ensuring sensitive data like passwords are hashed before storage, following best practices for authentication.
- [x] **Restricts functionality**: Application features are restricted based on the authentication state, determined by validating the user's session token stored in a cookie. Unauthorized users cannot access restricted functionality.


## WebSocket Deliverable

### Design

The WebSocket implementation allows real-time communication between the client and server for order status updates. The backend listens for WebSocket connections, and the frontend initializes the connection when the chat container is rendered. Messages sent over the WebSocket include notifications about order statuses such as "processed," "shipped," or "out of stock."

### Details

- [x] **Backend listens for WebSocket connection**: The server initializes a WebSocket connection using `WebSocketServer` from the `ws` library. During the HTTP `upgrade` process, the server authenticates the user and associates the WebSocket connection with the authenticated user's email address. The server keeps track of active connections and uses the `notifyClient` function to send updates to specific users based on their email.

- [x] **Frontend makes WebSocket connection**: The frontend establishes a WebSocket connection through the `orderNotifier` class when the `ChatContainer` component renders. The connection is closed when the user logs out and reinitialized when the user logs back in.

- [x] **Data sent over WebSocket connection**: Notifications for order status updates are sent over the WebSocket connection. These include:
    - `processed`: Order was successfully processed.
    - `shipped`: Order was shipped.
    - `outOfStock`: Item is out of stock.
    - `shippingDelayed`: Shipping was delayed.

- [x] **WebSocket data displayed**: The client listens for messages sent over the WebSocket connection. Order status updates are displayed as bot messages in the chat interface with the sender set to "Henri."

