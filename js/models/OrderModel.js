import { getDB } from '../db.js';

export class OrderModel {
  static async getAll() {
    const db = await getDB();
    return new Promise((res, rej) => {
      const tx = db.transaction('orders', 'readonly');
      const req = tx.objectStore('orders').getAll();
      req.onsuccess = () => res(req.result);
      req.onerror = (e) => rej(e.target.error);
    });
  }

  static async createOrder(orderData) {
    const db = await getDB();
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    const order = {
      ...orderData,
      id: `ORD-${Date.now().toString().slice(-4)}`,
      pickupPin: pin,
      status: orderData.fulfillmentType === 'pickup' ? 'ready_for_pickup' : 'dispatched_to_fleet',
      createdAt: new Date().toISOString()
    };
    return new Promise((res, rej) => {
      const tx = db.transaction('orders', 'readwrite');
      tx.objectStore('orders').put(order);
      tx.oncomplete = () => res(order);
      tx.onerror = (e) => rej(e.target.error);
    });
  }

  static async completeOrder(orderId) {
    const db = await getDB();
    return new Promise((res, rej) => {
      const tx = db.transaction('orders', 'readwrite');
      const store = tx.objectStore('orders');
      const req = store.get(orderId);

      req.onsuccess = () => {
        const order = req.result;
        if (!order) {
          tx.abort();
          return rej(new Error('Order not found'));
        }
        order.status = 'completed';
        order.completedAt = new Date().toISOString();
        store.put(order);
      };

      tx.oncomplete = () => res(true);
      tx.onerror = (e) => rej(e.target.error);
    });
  }
}
