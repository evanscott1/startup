class OrderNotifier {
    messageHistory = [];
    handlers = [];
  
    constructor() {
      const port = window.location.port;
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);

      let retryInterval = 1000;
  
      this.socket.onopen = () => {
        console.log('WebSocket connection established.');
      };
  
      this.socket.onclose = () => {
        console.log('WebSocket connection closed.');
      };

      this.socket.onerror = () => {
        console.error('WebSocket error, retrying...');
        setTimeout(connect, retryInterval);
        retryInterval = Math.min(retryInterval * 2, 30000);
    };
  
      this.socket.onmessage = async (msg) => {
        try {
          const event = JSON.parse(msg.data);
          this.receiveMessage(event);
        } catch (error) {
          console.error('Failed to process incoming WebSocket message:', error);
        }
      };
    }

  
    // Add a message handler for processing received messages
    addHandler(handler) {
      this.handlers.push(handler);
    }
  
    // Remove a message handler
    removeHandler(handler) {
      this.handlers = this.handlers.filter((h) => h !== handler);
    }
  
    // Process incoming messages and update the message history
    receiveMessage(event) {
      const formattedMessage = this.formatMessage(event);
      this.messageHistory.push(formattedMessage);
  
      // Notify all handlers of the new message
      this.handlers.forEach((handler) => {
        handler(formattedMessage);
      });
    }
  
    // Format the raw event into a user-friendly message object
    formatMessage(event) {
      let statusText;
      switch (event.status) {
        case 'processed':
          statusText = `Order ${event.orderId} has been processed.`;
          break;
        case 'shipped':
          statusText = `Order ${event.orderId} has been shipped.`;
          break;
        case 'shippingDelayed':
          statusText = `Order ${event.orderId} shipping is delayed.`;
          break;
        case 'outOfStock':
          statusText = `Order ${event.orderId} is out of stock.`;
          break;
        default:
          statusText = `Unknown status for Order ${event.orderId}.`;
      }
  
      return {
        orderId: event.orderId,
        status: event.status,
        message: statusText,
        timestamp: new Date().toISOString(),
      };
    }
  }
  
  export const orderNotifier = new OrderNotifier();
  