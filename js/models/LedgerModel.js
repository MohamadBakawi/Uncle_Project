import { getDB } from '../db.js';

export class LedgerModel {
  static async getAll() {
    const db = await getDB();
    return new Promise((res, rej) => {
      const tx = db.transaction('ledger', 'readonly');
      const req = tx.objectStore('ledger').getAll();
      req.onsuccess = () => res(req.result);
      req.onerror = (e) => rej(e.target.error);
    });
  }

  static async recordTransaction(entry) {
    const db = await getDB();
    const record = {
      ...entry,
      timestamp: new Date().toISOString()
    };
    return new Promise((res, rej) => {
      const tx = db.transaction('ledger', 'readwrite');
      tx.objectStore('ledger').put(record);
      tx.oncomplete = () => res(record);
      tx.onerror = (e) => rej(e.target.error);
    });
  }
}
