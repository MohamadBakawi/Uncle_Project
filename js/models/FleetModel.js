import { getDB } from '../db.js';

export class FleetModel {
  static async getAll() {
    const db = await getDB();
    return new Promise((res, rej) => {
      const tx = db.transaction('fleet', 'readonly');
      const req = tx.objectStore('fleet').getAll();
      req.onsuccess = () => res(req.result);
      req.onerror = (e) => rej(e.target.error);
    });
  }

  static async assignFirstAvailableVan(orderId) {
    const db = await getDB();
    return new Promise((res, rej) => {
      const tx = db.transaction('fleet', 'readwrite');
      const store = tx.objectStore('fleet');
      const req = store.getAll();

      req.onsuccess = () => {
        const vans = req.result;
        const availableVan = vans.find((v) => v.status === 'available');
        if (availableVan) {
          availableVan.status = 'delivering';
          availableVan.currentOrderId = orderId;
          store.put(availableVan);
          res(availableVan);
        } else {
          res(null);
        }
      };

      tx.onerror = (e) => rej(e.target.error);
    });
  }

  static async releaseVan(orderId) {
    const db = await getDB();
    return new Promise((res, rej) => {
      const tx = db.transaction('fleet', 'readwrite');
      const store = tx.objectStore('fleet');
      const req = store.getAll();

      req.onsuccess = () => {
        const vans = req.result;
        const assignedVan = vans.find((v) => v.currentOrderId === orderId);
        if (assignedVan) {
          assignedVan.status = 'available';
          assignedVan.currentOrderId = null;
          store.put(assignedVan);
          res(assignedVan);
        } else {
          res(null);
        }
      };

      tx.onerror = (e) => rej(e.target.error);
    });
  }
}
