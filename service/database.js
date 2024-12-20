const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('henri');
const userCollection = db.collection('user');
const orderCollection = db.collection('order');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(name, email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    name: name,
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

async function addOrder(order) {
  return orderCollection.insertOne(order);
}

function getOrders(email) {
  const query = { email: email };
  const options = {
    sort: { orderId: -1 },
    limit: 10,
  };
  const cursor = orderCollection.find(query, options);
  return cursor.toArray();
}

async function deleteOrders(email) {
  const query = { email: email };
  const result = await orderCollection.deleteMany(query);
  return result.deletedCount;
}



module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addOrder,
  getOrders,
  deleteOrders,
};
