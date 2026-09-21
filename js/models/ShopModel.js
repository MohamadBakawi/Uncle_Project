import { getDB } from '../db.js';

export class ShopModel {
  static async getAll() {
    const db = await getDB();
    return new Promise((res, rej) => {
      const tx = db.transaction('shops', 'readonly');
      const req = tx.objectStore('shops').getAll();
      req.onsuccess = () => res(req.result);
      req.onerror = (e) => rej(e.target.error);
    });
  }

  static async getById(id) {
    const db = await getDB();
    return new Promise((res, rej) => {
      const tx = db.transaction('shops', 'readonly');
      const req = tx.objectStore('shops').get(id);
      req.onsuccess = () => res(req.result);
      req.onerror = (e) => rej(e.target.error);
    });
  }

  static async addEarnings(shopId, holdingAmount = 0, adAmount = 0) {
    const db = await getDB();
    return new Promise((res, rej) => {
      const tx = db.transaction('shops', 'readwrite');
      const store = tx.objectStore('shops');
      const req = store.get(shopId);

      req.onsuccess = () => {
        const shop = req.result;
        if (shop) {
          shop.earnedHolding = (shop.earnedHolding || 0) + holdingAmount;
          shop.earnedAds = (shop.earnedAds || 0) + adAmount;
          store.put(shop);
        }
      };

      tx.oncomplete = () => res(true);
      tx.onerror = (e) => rej(e.target.error);
    });
  }
}
