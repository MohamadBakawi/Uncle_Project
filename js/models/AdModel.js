import { getDB } from '../db.js';

export class AdModel {
  static async getAll() {
    const db = await getDB();
    return new Promise((res, rej) => {
      const tx = db.transaction('ads', 'readonly');
      const req = tx.objectStore('ads').getAll();
      req.onsuccess = () => res(req.result);
      req.onerror = (e) => rej(e.target.error);
    });
  }

  static async recordImpression(adId, count = 1) {
    const db = await getDB();
    return new Promise((res, rej) => {
      const tx = db.transaction('ads', 'readwrite');
      const store = tx.objectStore('ads');
      const req = store.get(adId);

      req.onsuccess = () => {
        const ad = req.result;
        if (ad) {
          ad.impressionsToday = (ad.impressionsToday || 0) + count;
          store.put(ad);
        }
      };

      tx.oncomplete = () => res(true);
      tx.onerror = (e) => rej(e.target.error);
    });
  }
}
