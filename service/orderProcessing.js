const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
  // Create a websocket object
  const wss = new WebSocketServer({ noServer: true });

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  // Keep track of all the connections
  let connections = [];

  wss.on('connection', (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);

    // Handle incoming messages
    ws.on('message', function message(data) {
      try {
        const parsedMessage = JSON.parse(data);

        if (parsedMessage.type === 'newOrder') {
          console.log(`New order received: ${parsedMessage.orderId}`);
          
          // Simulate order processing
          simulateOrderProcessing(ws, parsedMessage.orderId);
        }
      } catch (error) {
        console.error('Failed to process message:', error);
      }
    });

    // Remove the closed connection
    ws.on('close', () => {
      const pos = connections.findIndex((o) => o.id === connection.id);
      if (pos >= 0) {
        connections.splice(pos, 1);
      }
    });

    // Respond to pong messages to keep the connection alive
    ws.on('pong', () => {
      connection.alive = true;
    });
  });

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
}

function simulateOrderProcessing(ws, orderId) {
  // Simulate order processed
  setTimeout(() => {
    if (Math.random() < 0.1) {
      // 10% chance of out of stock
      ws.send(JSON.stringify({ type: 'orderStatus', status: 'outOfStock', orderId }));
      return;
    }

    ws.send(JSON.stringify({ type: 'orderStatus', status: 'processed', orderId }));

    // Simulate shipping
    setTimeout(() => {
      if (Math.random() < 0.2) {
        // 20% chance of delayed shipping
        ws.send(JSON.stringify({ type: 'orderStatus', status: 'shippingDelayed', orderId }));
      } else {
        ws.send(JSON.stringify({ type: 'orderStatus', status: 'shipped', orderId }));
      }
    }, Math.random() * 5000 + 3000); // Shipping timer
  }, Math.random() * 5000 + 3000); // Processing timer
}

module.exports = { peerProxy };
