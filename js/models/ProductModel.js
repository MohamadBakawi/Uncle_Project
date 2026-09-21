import { getDB } from '../db.js';

export class ProductModel {
  static async getAll() {
    const db = await getDB();
    return new Promise((res, rej) => {
      const tx = db.transaction('products', 'readonly');
      const req = tx.objectStore('products').getAll();
      req.onsuccess = () => res(req.result);
      req.onerror = (e) => rej(e.target.error);
    });
  }

  static async getById(id) {
    const db = await getDB();
    return new Promise((res, rej) => {
      const tx = db.transaction('products', 'readonly');
      const req = tx.objectStore('products').get(id);
      req.onsuccess = () => res(req.result);
      req.onerror = (e) => rej(e.target.error);
    });
  }

  static async addPitch(productData) {
    const db = await getDB();
    const product = {
      ...productData,
      id: `SKU-${Date.now().toString().slice(-6)}`,
      status: 'active'
    };
    return new Promise((res, rej) => {
      const tx = db.transaction('products', 'readwrite');
      tx.objectStore('products').put(product);
      tx.oncomplete = () => res(product);
      tx.onerror = (e) => rej(e.target.error);
    });
  }
}
