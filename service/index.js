const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const DB = require("./database.js");
const { peerProxy } = require('./peerProxy.js');


const authCookieName = "token";

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

app.use(express.static("public"));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set("trust proxy", true);

// In-memory data storage
let users = [
  { name: "e", email: "e@e.com", password: "eeeeeeee", token: "abc123" },
];

let orders = [];
let orderCounter = 1;

// CreateAuth: Create a new user
apiRouter.post("/auth/create", async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const newUser = await DB.createUser(
      req.body.name,
      req.body.email,
      req.body.password
    );

    // Set the cookie
    setAuthCookie(res, newUser.token);

    res.send({
      id: newUser._id,
    });

  }
});

// GetAuth: Login an existing user
apiRouter.post("/auth/login", async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
});

// DeleteAuth: Logout a user
apiRouter.delete("/auth/logout", (req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

apiRouter.get('/auth/status', async (req, res) => {
  try {

    const authToken = req.cookies[authCookieName];
    
    if (!authToken) {
      return res.status(401).json({ authenticated: false });
    }

    const user = await DB.getUserByToken(authToken);

    if (!user) {
      return res.status(401).json({ authenticated: false });
    }

    return res.status(200).json({
      authenticated: true,
      email: user.email,
    });
  } catch (error) {
    console.error('Error in /auth/status:', error);

    return res.status(500).json({ authenticated: false, error: 'Internal server error' });
  }
});


// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});


// GetOrders: Get orders for the authenticated user
secureApiRouter.get("/orders", async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);

  const userOrders = await DB.getOrders(user.email);
  res.send(userOrders);
});

// CreateOrder: Add a new order for the authenticated user
secureApiRouter.post("/orders", async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);

  const newOrder = {
    email: user.email,
    orderId: orderCounter.toString(),
    message: req.body.joke,
  };

  orderCounter++;

  await DB.addOrder(newOrder);

  res.status(201).send(newOrder);
});

// Clear all orders for the authenticated user
secureApiRouter.delete("/orders", async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);

  await DB.deleteOrders(user.email);

  res.status(204).end();
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);
