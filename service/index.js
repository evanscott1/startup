const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';


const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

app.use(express.static("public"));

const uuid = require("uuid");
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);


// In-memory data storage
let users = [
  { name: "e", email: "e@e.com", password: "eeeeeeee", token: "abc123" }
];

let orders = [];
let orderCounter = 1;

// CreateAuth: Create a new user
apiRouter.post("/auth/create", async (req, res) => {
  const existingUser = users.find((user) => user.email === req.body.email);
  if (existingUser) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      token: uuid.v4()
    };
    users.push(newUser);

    res.send({ token: newUser.token });
  }
});

// GetAuth: Login an existing user
apiRouter.post("/auth/login", async (req, res) => {
  const user = users.find((user) => user.email === req.body.email);
  if (user) {
    if (req.body.password === user.password) {
      user.token = uuid.v4();
      res.send({ token: user.token });
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
});

// DeleteAuth: Logout a user
apiRouter.delete("/auth/logout", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: "Authorization header missing" });
  }

  // Extract the token ("Bearer <token>")
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Invalid authorization header format" });
  }

  const user = users.find((u) => u.token === token);

  if (!user) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }

  delete user.token;

  return res.status(204).end();
});

// GetOrders: Get orders for the authenticated user
apiRouter.get("/orders", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  const user = users.find((u) => u.token === token);

  if (!user) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const userOrders = getOrders(user.email);
  res.send(userOrders);
});

// CreateOrder: Add a new order for the authenticated user
apiRouter.post("/orders", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  const user = users.find((u) => u.token === token);

  if (!user) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  if (!req.body.joke) {
    return res.status(400).send({ error: "Joke message is required" });
  }

  const newOrder = {
    email: user.email,
    orderId: orderCounter.toString(),
    message: req.body.joke
  };

  orderCounter++;

  orders.push(newOrder);

  res.status(201).send(newOrder);
});

// Clear all orders for the authenticated user
apiRouter.delete('/orders', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Authorization token required' });
    }
  
    const user = users.find((u) => u.token === token);
  
    if (!user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  
    orders = orders.filter((order) => order.email !== user.email);
  
    res.status(204).end(); // Respond with No Content
  });

// Helper function to get orders
function getOrders(email) {
  return orders.filter((order) => order.email === email);
}


