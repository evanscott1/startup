const express = require("express");
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(express.json());
app.use(express.static('public'));

const uuid = require("uuid");
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// In-memory data storage
let users = [
  { name: "e", email: "e@e.com", password: "eeeeeeee", token: "abc123" }
];

let orders = [
  { email: "e@e.com", orderId: "20" },
  { email: "e@e.com", orderId: "30" }
];

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
  const user = users.find((u) => u.token === req.headers.authorization);
  if (user) {
    delete user.token;
  }
  res.status(204).end();
});

// GetOrders: Get orders for the authenticated user
apiRouter.get("/orders", (req, res) => {
  const token = req.headers.authorization;
  const user = users.find((u) => u.token === token);

  if (!user) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const userOrders = getOrders(user.username);
  res.send(userOrders);
});

// CreateOrder: Add a new order for the authenticated user
apiRouter.post("/orders", (req, res) => {
    const token = req.headers.authorization;
    const user = users.find((u) => u.token === token);
  
    // Check if the user is authenticated
    if (!user) {
      return res.status(401).send({ error: "Unauthorized" });
    }
  
    // Validate request body
    if (!req.body.orderId) {
      return res.status(400).send({ error: "Order ID is required" });
    }
  
    // Create the new order
    const newOrder = {
      username: user.email,
      orderId: req.body.orderId
    };
  
    // Add the new order to the orders array
    orders.push(newOrder);
  
    // Return the updated list of orders for the user
    const userOrders = getOrders(user.email);
    res.status(201).send(userOrders);
  });
  

// Helper function to get orders
function getOrders(email) {
  return orders.filter((order) => order.email === email);
}

