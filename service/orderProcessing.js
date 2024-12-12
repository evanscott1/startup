const { WebSocketServer } = require('ws');
const DB = require("./database.js");
const uuid = require('uuid');

function orderProcessing(httpServer) {
  const wss = new WebSocketServer({ noServer: true });

  // Keep track of all connections
  let connections = [];

  // Handle WebSocket connection upgrade
  httpServer.on('upgrade', async (request, socket, head) => {
    const authToken = getAuthTokenFromRequest(request); // Extract token from headers
    if (!authToken) {
      socket.destroy();
      return;
    }

  
    try {
        // Use `await` here to ensure database access completes
        const user = await DB.getUserByToken(authToken);
  
        if (!user) {
          socket.destroy();
          return;
        }


      wss.handleUpgrade(request, socket, head, (ws) => {
        const connection = { id: uuid.v4(), alive: true, ws, email: user.email };
        connections.push(connection);

        ws.on('close', () => {
          connections = connections.filter((conn) => conn.id !== connection.id);
        });

        ws.on('pong', () => {
          connection.alive = true;
        });
      });
    } catch (err) {
      socket.destroy();
    }
  });

  // Notify a specific client by email
  function notifyClient(email, message) {
    const clientConnection = connections.find((conn) => conn.email === email);
    if (clientConnection) {
      clientConnection.ws.send(JSON.stringify(message));
    }
  }

  // Simulate order processing for a specific client
  function simulateOrderProcessing(email, orderId) {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        notifyClient(email, { type: 'orderStatus', status: 'outOfStock', orderId });
        return;
      }

      notifyClient(email, { type: 'orderStatus', status: 'processed', orderId });

      setTimeout(() => {
        if (Math.random() < 0.2) {
          notifyClient(email, { type: 'orderStatus', status: 'shippingDelayed', orderId });
        } else {
          notifyClient(email, { type: 'orderStatus', status: 'shipped', orderId });
        }
      }, Math.random() * 5000 + 3000); // Shipping timer
    }, Math.random() * 5000 + 3000); // Processing timer
  }

  // Keep active connections alive
  setInterval(() => {
    connections.forEach((c) => {
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);

  return { notifyClient, simulateOrderProcessing };
}

function getAuthTokenFromRequest(request) {
  const cookies = request.headers.cookie || '';
  const authCookie = cookies.split(';').find((c) => c.trim().startsWith('token='));
  return authCookie ? authCookie.split('=')[1] : null;
}

module.exports = { orderProcessing };
