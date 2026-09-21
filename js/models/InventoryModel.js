import { getDB } from '../db.js';

export class InventoryModel {
  static async getAll() {
    const db = await getDB();
    return new Promise((res, rej) => {
      const tx = db.transaction('inventory', 'readonly');
      const req = tx.objectStore('inventory').getAll();
      req.onsuccess = () => res(req.result);
      req.onerror = (e) => rej(e.target.error);
    });
  }

  static async addConsignmentDrop(shopId, productId, qty) {
    const id = `${shopId}_${productId}`;
    const db = await getDB();
    return new Promise((res, rej) => {
      const tx = db.transaction('inventory', 'readwrite');
      const store = tx.objectStore('inventory');
      const req = store.get(id);

      req.onsuccess = () => {
        let entry = req.result;
        if (entry) {
          entry.qty += qty;
        } else {
          entry = { id, shopId, productId, qty, reserved: 0 };
        }
        store.put(entry);
      };

      tx.oncomplete = () => res({ id, shopId, productId, qty });
      tx.onerror = (e) => rej(e.target.error);
    });
  }

  static async deductStock(shopId, productId, qty) {
    const id = `${shopId}_${productId}`;
    const db = await getDB();
    return new Promise((res, rej) => {
      const tx = db.transaction('inventory', 'readwrite');
      const store = tx.objectStore('inventory');
      const req = store.get(id);

      req.onsuccess = () => {
        const entry = req.result;
        if (!entry || entry.qty < qty) {
          tx.abort();
          return rej(new Error('Insufficient node stock'));
        }
        entry.qty -= qty;
        store.put(entry);
      };

      tx.oncomplete = () => res(true);
      tx.onerror = (e) => rej(e.target.error || new Error('Deduction failed'));
    });
  }
}
