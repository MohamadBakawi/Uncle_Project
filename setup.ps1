# Create Directories
New-Item -ItemType Directory -Force -Path "css", "js", "js/models", "js/views", "js/controllers" | Out-Null

Write-Host "Creating project files..." -ForegroundColor Cyan

# 1. index.html
@'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OmniTrade Hyperlocal ERP & Distribution Network</title>
  <link rel="stylesheet" href="css/style.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
</head>
<body>

  <!-- Top Guided Demo Tour Banner -->
  <header id="tour-bar" class="tour-bar"></header>

  <!-- Main Navigation Bar -->
  <nav class="main-nav">
    <div class="nav-brand">
      <span class="logo-icon">⚡</span>
      <span class="logo-text"><strong>OmniTrade</strong> Hub</span>
      <span class="badge">Hyperlocal 3PL & Media</span>
    </div>
    <div class="nav-tabs" id="nav-tabs">
      <button class="nav-btn active" data-view="b2b-portal">🏢 Unified B2B Portal</button>
      <button class="nav-btn" data-view="erp-hub">⚙️ Central ERP</button>
      <button class="nav-btn" data-view="shop-terminal">🏪 Partner Shop & Ad Screen</button>
      <button class="nav-btn" data-view="fleet-hub">🚚 Van Fleet</button>
    </div>
    <div class="nav-actions">
      <button id="btn-seed-reset" class="btn-secondary-outline" title="Reset demo data to initial state">↺ Reset Demo Data</button>
    </div>
  </nav>

  <!-- Dynamic Views Container -->
  <main id="app-container" class="app-container">
    <section id="view-b2b-portal" class="view-panel active"></section>
    <section id="view-erp-hub" class="view-panel"></section>
    <section id="view-shop-terminal" class="view-panel"></section>
    <section id="view-fleet-hub" class="view-panel"></section>
  </main>

  <!-- Global Toast Notification Container -->
  <div id="toast-container" class="toast-container"></div>

  <!-- Main Application Script (ES Module) -->
  <script type="module" src="js/app.js"></script>
</body>
</html>
'@ | Set-Content -Path "index.html" -Encoding UTF8

# 2. css/style.css
@'
:root {
  --bg-main: #0b0f19;
  --bg-card: #111827;
  --bg-card-hover: #1f2937;
  --bg-input: #1e293b;
  --border-color: #334155;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --accent-blue: #3b82f6;
  --accent-blue-hover: #2563eb;
  --accent-green: #10b981;
  --accent-amber: #f59e0b;
  --accent-purple: #8b5cf6;
  --accent-red: #ef4444;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  background-color: var(--bg-main);
  color: var(--text-primary);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.tour-bar {
  background: linear-gradient(90deg, #1e1b4b, #311042);
  border-bottom: 1px solid #4338ca;
  padding: 10px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.88rem;
}
.tour-step-info {
  display: flex;
  align-items: center;
  gap: 12px;
}
.tour-badge {
  background: var(--accent-purple);
  color: #fff;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}
.tour-controls {
  display: flex;
  gap: 8px;
}

.main-nav {
  background: #0f172a;
  border-bottom: 1px solid var(--border-color);
  padding: 0 24px;
  display: flex;
  align-items: center;
  height: 64px;
  gap: 24px;
}
.nav-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
}
.logo-icon { font-size: 1.3rem; }
.badge {
  font-size: 0.7rem;
  background: rgba(59, 130, 246, 0.15);
  color: var(--accent-blue);
  border: 1px solid rgba(59, 130, 246, 0.3);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
}
.nav-tabs {
  display: flex;
  gap: 6px;
  flex: 1;
}
.nav-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.15s ease;
}
.nav-btn:hover {
  background: var(--bg-card);
  color: var(--text-primary);
}
.nav-btn.active {
  background: var(--accent-blue);
  color: #fff;
  font-weight: 600;
}
.btn-secondary-outline {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 0.8rem;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
}
.btn-secondary-outline:hover {
  border-color: var(--text-primary);
  color: var(--text-primary);
}

.app-container {
  flex: 1;
  padding: 24px;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
}
.view-panel {
  display: none;
  animation: fadeIn 0.2s ease-in-out;
}
.view-panel.active {
  display: block;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(3px); }
  to { opacity: 1; transform: translateY(0); }
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 20px;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 10px;
}
.card-header h3 {
  font-size: 1.05rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}
.stat-box {
  background: #1e293b;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 16px;
  display: flex;
  flex-direction: column;
}
.stat-box .title {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 6px;
}
.stat-box .value {
  font-size: 1.5rem;
  font-weight: 700;
  font-family: var(--font-mono);
}
.stat-box .subtext {
  font-size: 0.75rem;
  color: var(--accent-green);
  margin-top: 4px;
}

.table-responsive {
  overflow-x: auto;
}
table.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}
table.data-table th {
  text-align: left;
  padding: 10px 12px;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.72rem;
  letter-spacing: 0.05em;
}
table.data-table td {
  padding: 12px;
  border-bottom: 1px solid rgba(51, 65, 85, 0.4);
}
table.data-table tr:hover td {
  background-color: rgba(255, 255, 255, 0.02);
}

.form-group {
  margin-bottom: 14px;
}
.form-group label {
  display: block;
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 6px;
}
.form-control {
  width: 100%;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.85rem;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  outline: none;
}
.form-control:focus {
  border-color: var(--accent-blue);
}
.btn-primary {
  background: var(--accent-blue);
  color: #fff;
  border: none;
  font-family: inherit;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.85rem;
}
.btn-primary:hover {
  background: var(--accent-blue-hover);
}
.btn-success {
  background: var(--accent-green);
  color: #fff;
  border: none;
  font-family: inherit;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  cursor: pointer;
}
.btn-small {
  padding: 4px 10px;
  font-size: 0.75rem;
}

.digital-screen-tv {
  background: #000;
  border: 8px solid #27272a;
  border-radius: var(--radius-lg);
  box-shadow: 0 0 25px rgba(59, 130, 246, 0.25);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 280px;
  transition: transform 0.15s ease;
}
.screen-header-ticker {
  background: rgba(0, 0, 0, 0.8);
  font-size: 0.75rem;
  padding: 6px 12px;
  color: var(--accent-amber);
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #3f3f46;
}
.ad-display-content {
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #1e1b4b, #0f172a);
}
.ad-display-content h2 {
  font-size: 1.6rem;
  color: #f8fafc;
  margin-bottom: 8px;
}
.ad-display-content p {
  color: #cbd5e1;
  font-size: 0.95rem;
  max-width: 80%;
  margin-bottom: 12px;
}
.ad-callout {
  background: var(--accent-amber);
  color: #000;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
}
.screen-footer-metrics {
  background: #18181b;
  font-size: 0.75rem;
  padding: 6px 12px;
  color: var(--text-secondary);
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
}

.toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
}
.toast {
  background: #1e293b;
  border-left: 4px solid var(--accent-blue);
  color: #fff;
  padding: 12px 18px;
  border-radius: var(--radius-sm);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  font-size: 0.85rem;
  min-width: 280px;
  animation: slideIn 0.25s ease-out forwards;
  transition: opacity 0.3s ease;
}
.toast.toast-success { border-left-color: var(--accent-green); }
.toast.toast-amber { border-left-color: var(--accent-amber); }
@keyframes slideIn {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}
'@ | Set-Content -Path "css/style.css" -Encoding UTF8

# 3. js/db.js
@'
const DB_NAME = 'OmniTrade_DB';
const DB_VERSION = 1;

let dbInstance = null;

export async function getDB() {
  if (dbInstance) return dbInstance;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains('products')) {
        const prodStore = db.createObjectStore('products', { keyPath: 'id' });
        prodStore.createIndex('status', 'status', { unique: false });
      }

      if (!db.objectStoreNames.contains('shops')) {
        db.createObjectStore('shops', { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains('inventory')) {
        const invStore = db.createObjectStore('inventory', { keyPath: 'id' });
        invStore.createIndex('shopId', 'shopId', { unique: false });
        invStore.createIndex('productId', 'productId', { unique: false });
      }

      if (!db.objectStoreNames.contains('orders')) {
        const ordStore = db.createObjectStore('orders', { keyPath: 'id' });
        ordStore.createIndex('status', 'status', { unique: false });
      }

      if (!db.objectStoreNames.contains('ads')) {
        db.createObjectStore('ads', { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains('fleet')) {
        db.createObjectStore('fleet', { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains('ledger')) {
        db.createObjectStore('ledger', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = async (event) => {
      dbInstance = event.target.result;
      await ensureSeedData(dbInstance);
      resolve(dbInstance);
    };

    request.onerror = (event) => reject(event.target.error);
  });
}

async function ensureSeedData(db) {
  return new Promise((resolve) => {
    const tx = db.transaction(['products'], 'readonly');
    const countReq = tx.objectStore('products').count();
    countReq.onsuccess = async () => {
      if (countReq.result === 0) {
        await seedDatabase(db);
      }
      resolve();
    };
  });
}

export async function seedDatabase(db = dbInstance) {
  if (!db) db = await getDB();

  const writeTx = db.transaction(
    ['products', 'shops', 'inventory', 'orders', 'ads', 'fleet', 'ledger'],
    'readwrite'
  );

  ['products', 'shops', 'inventory', 'orders', 'ads', 'fleet', 'ledger'].forEach((store) => {
    writeTx.objectStore(store).clear();
  });

  const products = [
    {
      id: 'SKU-COF-01',
      name: 'Arabica Reserve Espresso Beans (1kg)',
      brand: 'Levant Roast Co.',
      category: 'Beverage / Food Service',
      distributorWholesale: 18.0,
      clientPrice: 24.0,
      status: 'active',
      desc: 'Commercial whole-bean coffee for cafes.'
    },
    {
      id: 'SKU-OAT-02',
      name: 'Barista Grade Oat Milk (12x1L Pack)',
      brand: 'Nordic Dairy Free',
      category: 'Specialty Dairy',
      distributorWholesale: 22.0,
      clientPrice: 30.0,
      status: 'active',
      desc: 'High foam micro-filtered oat milk cartons.'
    },
    {
      id: 'SKU-ECO-03',
      name: 'Biodegradable Takeaway Cups 8oz (500pk)',
      brand: 'GreenPack Intl',
      category: 'Packaging Supplies',
      distributorWholesale: 35.0,
      clientPrice: 48.0,
      status: 'active',
      desc: 'Compostable hot cups for hospitality.'
    }
  ];
  products.forEach((p) => writeTx.objectStore('products').put(p));

  const shops = [
    {
      id: 'SHOP-01',
      name: 'Hamra Express Grocers',
      neighborhood: 'Hamra Main St',
      contact: 'Abou Fadi',
      holdingFeePerUnit: 1.5,
      adScreenId: 'SCR-101',
      screenStatus: 'online',
      dailyFootfall: 950,
      earnedHolding: 14.4,
      earnedAds: 16.0
    },
    {
      id: 'SHOP-02',
      name: 'Achrafieh Corner Bodega',
      neighborhood: 'Sassine Square',
      contact: 'Marc K.',
      holdingFeePerUnit: 1.5,
      adScreenId: 'SCR-102',
      screenStatus: 'online',
      dailyFootfall: 1200,
      earnedHolding: 0.0,
      earnedAds: 18.5
    },
    {
      id: 'SHOP-03',
      name: 'Verdun QuickMarket',
      neighborhood: 'Verdun Blvd',
      contact: 'Samir T.',
      holdingFeePerUnit: 1.5,
      adScreenId: 'SCR-103',
      screenStatus: 'online',
      dailyFootfall: 800,
      earnedHolding: 0.0,
      earnedAds: 12.0
    }
  ];
  shops.forEach((s) => writeTx.objectStore('shops').put(s));

  const inventories = [
    { id: 'SHOP-01_SKU-COF-01', shopId: 'SHOP-01', productId: 'SKU-COF-01', qty: 25, reserved: 0 },
    { id: 'SHOP-01_SKU-OAT-02', shopId: 'SHOP-01', productId: 'SKU-OAT-02', qty: 15, reserved: 0 },
    { id: 'SHOP-02_SKU-COF-01', shopId: 'SHOP-02', productId: 'SKU-COF-01', qty: 30, reserved: 0 },
    { id: 'SHOP-02_SKU-ECO-03', shopId: 'SHOP-02', productId: 'SKU-ECO-03', qty: 10, reserved: 0 },
    { id: 'SHOP-03_SKU-OAT-02', shopId: 'SHOP-03', productId: 'SKU-OAT-02', qty: 20, reserved: 0 }
  ];
  inventories.forEach((i) => writeTx.objectStore('inventory').put(i));

  const ads = [
    {
      id: 'AD-01',
      title: 'Nitro Blast Energy Drink',
      brand: 'Nitro Co.',
      callout: 'Buy 1, Get 1 Cold at the fridge counter!',
      cpmRate: 0.08,
      impressionsToday: 640,
      active: true
    },
    {
      id: 'AD-02',
      title: 'Cedar Valley Gourmet Chips',
      brand: 'Levant Snacks',
      callout: 'Artisanal sea salt & thyme. Grab a pack now!',
      cpmRate: 0.06,
      impressionsToday: 510,
      active: true
    }
  ];
  ads.forEach((a) => writeTx.objectStore('ads').put(a));

  const fleet = [
    { id: 'VAN-01', driver: 'Tarek Z.', plate: 'B-48192', capacityUnits: 150, status: 'available', currentZone: 'Hamra / Ras Beirut', currentOrderId: null },
    { id: 'VAN-02', driver: 'Ziad N.', plate: 'M-10294', capacityUnits: 120, status: 'available', currentZone: 'Achrafieh', currentOrderId: null }
  ];
  fleet.forEach((v) => writeTx.objectStore('fleet').put(v));

  const seedOrder = {
    id: 'ORD-901',
    clientName: 'Bliss Roasters & Bakery',
    shopId: 'SHOP-01',
    productId: 'SKU-COF-01',
    quantity: 4,
    totalPrice: 96.0,
    fulfillmentType: 'pickup',
    pickupPin: '4821',
    status: 'ready_for_pickup',
    createdAt: new Date(Date.now() - 3600000).toISOString()
  };
  writeTx.objectStore('orders').put(seedOrder);

  const seedLedger = {
    orderId: 'ORD-901',
    totalPrice: 96.0,
    producerAmount: 72.0,
    platformMargin: 14.4,
    shopCut: 6.72,
    fleetCut: 2.88,
    timestamp: new Date(Date.now() - 3600000).toISOString()
  };
  writeTx.objectStore('ledger').put(seedLedger);

  return new Promise((resolve, reject) => {
    writeTx.oncomplete = () => resolve();
    writeTx.onerror = (e) => reject(e.target.error);
  });
}
'@ | Set-Content -Path "js/db.js" -Encoding UTF8

# 4. js/models/ProductModel.js
@'
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
'@ | Set-Content -Path "js/models/ProductModel.js" -Encoding UTF8

# 5. js/models/ShopModel.js
@'
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
'@ | Set-Content -Path "js/models/ShopModel.js" -Encoding UTF8

# 6. js/models/InventoryModel.js
@'
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
'@ | Set-Content -Path "js/models/InventoryModel.js" -Encoding UTF8

# 7. js/models/OrderModel.js
@'
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
'@ | Set-Content -Path "js/models/OrderModel.js" -Encoding UTF8

# 8. js/models/AdModel.js
@'
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
'@ | Set-Content -Path "js/models/AdModel.js" -Encoding UTF8

# 9. js/models/FleetModel.js
@'
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
'@ | Set-Content -Path "js/models/FleetModel.js" -Encoding UTF8

# 10. js/models/LedgerModel.js
@'
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
'@ | Set-Content -Path "js/models/LedgerModel.js" -Encoding UTF8

# 11. js/views/TourView.js
@'
export class TourView {
  constructor(containerEl, onNextStep) {
    this.container = containerEl;
    this.onNextStep = onNextStep;
  }

  render(currentStepIndex, tourSteps) {
    const step = tourSteps[currentStepIndex];
    this.container.innerHTML = `
      <div class="tour-step-info">
        <span class="tour-badge">Step ${currentStepIndex + 1} of ${tourSteps.length}</span>
        <strong>${step.title}:</strong>
        <span>${step.desc}</span>
      </div>
      <div class="tour-controls">
        <button id="btn-tour-auto" class="btn-primary btn-small">
          ${currentStepIndex === tourSteps.length - 1 ? 'Finish Tour' : 'Run This Step →'}
        </button>
      </div>
    `;

    this.container.querySelector('#btn-tour-auto').addEventListener('click', () => {
      this.onNextStep();
    });
  }
}
'@ | Set-Content -Path "js/views/TourView.js" -Encoding UTF8

# 12. js/views/B2BPortalView.js
@'
export class B2BPortalView {
  constructor(containerEl) {
    this.container = containerEl;
  }

  render({ products, shops }) {
    this.container.innerHTML = `
      <div class="grid-2" style="margin-bottom: 24px;">
        <div class="card">
          <div class="card-header">
            <h3>📝 Producer Pitch Portal (Save Salesman Time)</h3>
            <span class="badge">Direct Inbound</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 16px;">
            Brands submit new products directly into our unified distribution network, bypassing physical sales rep routes.
          </p>
          <form id="form-pitch-product">
            <div class="form-group">
              <label>Product Name & Size</label>
              <input type="text" class="form-control" name="name" required placeholder="e.g. Cold Brew Nitrogen 330ml Can (Case of 24)" />
            </div>
            <div class="grid-2">
              <div class="form-group">
                <label>Brand / Producer</label>
                <input type="text" class="form-control" name="brand" required placeholder="e.g. Blue Mountain Roasters" />
              </div>
              <div class="form-group">
                <label>Category</label>
                <input type="text" class="form-control" name="category" required placeholder="e.g. Specialty Beverages" />
              </div>
            </div>
            <div class="grid-2">
              <div class="form-group">
                <label>Distributor Wholesale Price ($)</label>
                <input type="number" step="0.5" class="form-control" name="distributorWholesale" required value="20.0" />
              </div>
              <div class="form-group">
                <label>Client Target Price ($)</label>
                <input type="number" step="0.5" class="form-control" name="clientPrice" required value="28.0" />
              </div>
            </div>
            <button type="submit" class="btn-primary" style="width: 100%;">
              ⚡ Pitch SKU & Auto-Sync to Hyperlocal Nodes
            </button>
          </form>
        </div>

        <div class="card">
          <div class="card-header">
            <h3>📊 Salesman Route Replacement ROI</h3>
            <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: var(--accent-green);">Field Efficiency</span>
          </div>
          <div class="grid-2" style="margin-bottom: 16px;">
            <div class="stat-box">
              <span class="title">Traditional Salesman Hours</span>
              <span class="value" style="color: var(--accent-red);">42 hrs/wk</span>
              <span class="subtext" style="color: var(--accent-red);">Driving, waiting, manual order taking</span>
            </div>
            <div class="stat-box">
              <span class="title">OmniTrade Digital Pitch</span>
              <span class="value" style="color: var(--accent-green);">4 mins</span>
              <span class="subtext">Zero travel overhead, instant multi-node sync</span>
            </div>
          </div>
          <div style="background: var(--bg-input); padding: 14px; border-radius: var(--radius-sm); font-size: 0.82rem; border-left: 3px solid var(--accent-blue);">
            💡 <strong>How it works:</strong> The producer no longer needs a fleet of salesmen cold-visiting stores. They pitch once; our unified portal exposes their product to commercial buyers, backed by our partner shops holding consignment inventory.
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3>🛒 Unified B2B Storefront (Client Order & Node Selection)</h3>
          <span class="badge">Commercial Buyer View</span>
        </div>
        <div class="grid-2">
          <div>
            <h4 style="font-size: 0.9rem; margin-bottom: 12px; color: var(--text-secondary);">Available B2B Consignment Catalog</h4>
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>SKU Name</th>
                    <th>Brand</th>
                    <th>Wholesale Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody id="b2b-catalog-rows">
                  ${products.map(p => `
                    <tr>
                      <td><strong>${p.name}</strong><br><small style="color: var(--text-muted);">${p.category}</small></td>
                      <td>${p.brand}</td>
                      <td style="font-family: var(--font-mono); font-weight: 600;">$${p.clientPrice.toFixed(2)}</td>
                      <td>
                        <button class="btn-primary btn-small btn-select-order" data-id="${p.id}" data-name="${p.name}" data-price="${p.clientPrice}">
                          Order Stock
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div style="background: var(--bg-input); padding: 18px; border-radius: var(--radius-md);">
            <h4 style="font-size: 0.9rem; margin-bottom: 12px;">Instant Order Placement</h4>
            <form id="form-client-order">
              <input type="hidden" id="order-product-id" value="${products[0]?.id || ''}">
              <div class="form-group">
                <label>Client Company Name</label>
                <input type="text" class="form-control" id="order-client-name" value="Artisan Cafe Hamra" required>
              </div>
              <div class="grid-2">
                <div class="form-group">
                  <label>Selected Product</label>
                  <input type="text" class="form-control" id="order-product-name" value="${products[0]?.name || ''}" readonly>
                </div>
                <div class="form-group">
                  <label>Quantity</label>
                  <input type="number" class="form-control" id="order-qty" value="5" min="1" max="50">
                </div>
              </div>
              <div class="form-group">
                <label>Fulfillment Node (Partner Shop Holding Stock)</label>
                <select class="form-control" id="order-shop-id">
                  ${shops.map(s => `
                    <option value="${s.id}">${s.name} (${s.neighborhood})</option>
                  `).join('')}
                </select>
              </div>
              <div class="form-group">
                <label>Fulfillment Delivery Mode</label>
                <select class="form-control" id="order-fulfillment-type">
                  <option value="pickup">Client Pickup (Click & Collect with PIN)</option>
                  <option value="van_delivery">Hyperlocal Van Run (Under 30 mins)</option>
                </select>
              </div>
              <button type="submit" class="btn-success" style="width: 100%; margin-top: 8px;">
                Confirm Commercial Purchase
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  }
}
'@ | Set-Content -Path "js/views/B2BPortalView.js" -Encoding UTF8

# 13. js/views/ERPView.js
@'
export class ERPView {
  constructor(containerEl) {
    this.container = containerEl;
  }

  render({ products, shops, inventory, ledger, ads }) {
    const totalHeldUnits = inventory.reduce((sum, item) => sum + item.qty, 0);
    const totalPlatformProfit = ledger.reduce((sum, entry) => sum + (entry.platformMargin || 0), 0);
    const totalShopHoldingPaid = ledger.reduce((sum, entry) => sum + (entry.shopCut || 0), 0);

    this.container.innerHTML = `
      <div class="grid-4" style="margin-bottom: 24px;">
        <div class="stat-box">
          <span class="title">Decentralized Stock Held</span>
          <span class="value">${totalHeldUnits} units</span>
          <span class="subtext">Across ${shops.length} partner shops</span>
        </div>
        <div class="stat-box">
          <span class="title">Platform Logistics Margin</span>
          <span class="value" style="color: var(--accent-blue);">$${totalPlatformProfit.toFixed(2)}</span>
          <span class="subtext">15% fee per transaction</span>
        </div>
        <div class="stat-box">
          <span class="title">Shopkeeper Holding Payouts</span>
          <span class="value" style="color: var(--accent-green);">$${totalShopHoldingPaid.toFixed(2)}</span>
          <span class="subtext">Zero inventory risk for shops</span>
        </div>
        <div class="stat-box">
          <span class="title">B2C Retail Ad Screens</span>
          <span class="value" style="color: var(--accent-amber);">${ads.length} Active</span>
          <span class="subtext">Monetizing customer foot-traffic</span>
        </div>
      </div>

      <div class="card" style="margin-bottom: 24px;">
        <div class="card-header">
          <h3>📦 Virtual Multi-Node Warehouse Matrix</h3>
          <span class="badge">Real-Time ERP Stock</span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 14px;">
          The big producer's goods are consigned directly into partner shops. No central last-mile bottleneck.
        </p>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Product / SKU</th>
                <th>Brand</th>
                ${shops.map(s => `<th>${s.name}<br><small style="color: var(--text-muted);">${s.neighborhood}</small></th>`).join('')}
                <th>Total Held</th>
              </tr>
            </thead>
            <tbody>
              ${products.map(p => {
                let rowTotal = 0;
                return `
                  <tr>
                    <td><strong>${p.name}</strong></td>
                    <td>${p.brand}</td>
                    ${shops.map(s => {
                      const inv = inventory.find(i => i.shopId === s.id && i.productId === p.id);
                      const qty = inv ? inv.qty : 0;
                      rowTotal += qty;
                      return `<td style="font-family: var(--font-mono); font-weight: 600;">${qty}</td>`;
                    }).join('')}
                    <td style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-blue);">${rowTotal}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-header">
            <h3>📑 Automated Settlement Ledger</h3>
            <span class="badge">Per-Transaction Split</span>
          </div>
          <div class="table-responsive" style="max-height: 280px; overflow-y: auto;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Producer (75%)</th>
                  <th>Platform (15%)</th>
                  <th>Shop Node (7%)</th>
                  <th>Fleet (3%)</th>
                </tr>
              </thead>
              <tbody>
                ${ledger.length === 0 ? `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No settled transactions yet</td></tr>` : ''}
                ${ledger.map(l => `
                  <tr>
                    <td><strong>${l.orderId}</strong></td>
                    <td style="color: var(--accent-green); font-family: var(--font-mono);">$${l.producerAmount.toFixed(2)}</td>
                    <td style="color: var(--accent-blue); font-family: var(--font-mono);">$${l.platformMargin.toFixed(2)}</td>
                    <td style="color: var(--accent-amber); font-family: var(--font-mono);">$${l.shopCut.toFixed(2)}</td>
                    <td style="font-family: var(--font-mono);">$${l.fleetCut.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3>📺 Retail Media Network (In-Store Screens)</h3>
            <span class="badge" style="background: rgba(245, 158, 11, 0.15); color: var(--accent-amber);">B2C Monetization</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px;">
            Partner shops hold B2B goods in back, while their customer foot-traffic is monetized by digital screens in front.
          </p>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Campaign / Brand</th>
                  <th>CPM Rate</th>
                  <th>Impressions Today</th>
                  <th>Revenue Generated</th>
                </tr>
              </thead>
              <tbody>
                ${ads.map(ad => `
                  <tr>
                    <td><strong>${ad.title}</strong><br><small style="color: var(--text-muted);">${ad.brand}</small></td>
                    <td style="font-family: var(--font-mono);">$${ad.cpmRate.toFixed(2)}</td>
                    <td style="font-family: var(--font-mono);">${ad.impressionsToday}</td>
                    <td style="color: var(--accent-green); font-family: var(--font-mono); font-weight: 600;">
                      $${(ad.impressionsToday * ad.cpmRate).toFixed(2)}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
}
'@ | Set-Content -Path "js/views/ERPView.js" -Encoding UTF8

# 14. js/views/ShopTerminalView.js
@'
export class ShopTerminalView {
  constructor(containerEl) {
    this.container = containerEl;
  }

  render({ activeShop, shops, orders, inventory, products, activeAd }) {
    const shopOrders = orders.filter(o => o.shopId === activeShop.id && o.status === 'ready_for_pickup');

    this.container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; background: var(--bg-card); padding: 12px 18px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 1.2rem;">🏪</span>
          <strong>Active Partner Terminal:</strong>
          <select id="terminal-shop-select" class="form-control" style="width: auto; font-weight: 600;">
            ${shops.map(s => `
              <option value="${s.id}" ${s.id === activeShop.id ? 'selected' : ''}>
                ${s.name} - ${s.neighborhood}
              </option>
            `).join('')}
          </select>
        </div>
        <div style="display: flex; gap: 24px; font-size: 0.85rem;">
          <div>Holding Payout Earned: <strong style="color: var(--accent-green);">$${activeShop.earnedHolding.toFixed(2)}</strong></div>
          <div>Screen Ad Cut Earned: <strong style="color: var(--accent-amber);">$${activeShop.earnedAds.toFixed(2)}</strong></div>
        </div>
      </div>

      <div class="grid-2">
        <div>
          <div class="card" style="margin-bottom: 20px;">
            <div class="card-header">
              <h3>📥 Inbound Consignment Intake</h3>
              <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: var(--accent-green);">Zero Risk Holding</span>
            </div>
            <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 12px;">
              The distributor drops bulk pallets here. The shopkeeper confirms intake with one click.
            </p>
            <form id="form-shop-intake" class="grid-2">
              <div class="form-group">
                <label>Select Incoming Product</label>
                <select class="form-control" id="intake-product-id">
                  ${products.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label>Units Received</label>
                <input type="number" class="form-control" id="intake-qty" value="10" min="1">
              </div>
              <div style="grid-column: span 2;">
                <button type="submit" class="btn-primary" style="width: 100%;">
                  ✓ Confirm Stock Inbound (Drop to Consignment)
                </button>
              </div>
            </form>
          </div>

          <div class="card">
            <div class="card-header">
              <h3>🤝 Client Click & Collect Pickup Verification</h3>
              <span class="badge">Order Release</span>
            </div>
            ${shopOrders.length === 0 ? `
              <p style="color: var(--text-muted); font-size: 0.85rem; padding: 10px 0;">No B2B orders currently awaiting pickup at this node.</p>
            ` : `
              <div class="table-responsive">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Client Company</th>
                      <th>Pickup PIN</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${shopOrders.map(o => `
                      <tr>
                        <td><strong>${o.id}</strong></td>
                        <td>${o.clientName}</td>
                        <td style="font-family: var(--font-mono); font-size: 1.1rem; color: var(--accent-green); font-weight: 700;">
                          ${o.pickupPin}
                        </td>
                        <td>
                          <button class="btn-success btn-small btn-release-order" data-id="${o.id}">
                            Release Goods
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        </div>

        <div>
          <div class="card-header" style="margin-bottom: 8px;">
            <h3>📺 In-Store Digital Signage Screen Simulator</h3>
            <span class="badge" style="background: rgba(245, 158, 11, 0.15); color: var(--accent-amber);">Facing Walk-In Consumers</span>
          </div>
          <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 12px;">
            Mounted above the counter. Click screen to cycle active B2C sponsored ads.
          </p>

          <div class="digital-screen-tv">
            <div class="screen-header-ticker">
              <span>● LIVE BROADCAST | SCREEN ID: ${activeShop.adScreenId}</span>
              <span>${activeShop.name}</span>
            </div>
            <div class="ad-display-content">
              <span class="ad-callout">SPONSORED SPECIAL</span>
              <h2 id="tv-ad-title" style="margin-top: 10px;">${activeAd ? activeAd.title : 'Nitro Blast Energy'}</h2>
              <p id="tv-ad-callout">${activeAd ? activeAd.callout : 'Buy 1, Get 1 Cold at the fridge counter!'}</p>
              <div style="font-size: 0.75rem; color: #94a3b8;">Brand Partner: <strong id="tv-ad-brand">${activeAd ? activeAd.brand : 'Nitro Co.'}</strong></div>
            </div>
            <div class="screen-footer-metrics">
              <span>Footfall Today: <strong>${activeShop.dailyFootfall} shoppers</strong></span>
              <span id="tv-ad-impressions">Campaign Impressions: <strong>${activeAd ? activeAd.impressionsToday : 0}</strong></span>
            </div>
          </div>

          <div style="margin-top: 14px; text-align: center;">
            <button id="btn-simulate-footfall" class="btn-secondary-outline btn-small">
              👁️ Simulate 50 Shoppers Walk-In (Add Ad Impressions & Shop Earnings)
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
'@ | Set-Content -Path "js/views/ShopTerminalView.js" -Encoding UTF8

# 15. js/views/FleetView.js
@'
export class FleetView {
  constructor(containerEl) {
    this.container = containerEl;
  }

  render({ fleet, orders, shops }) {
    const vanOrders = orders.filter(o => o.fulfillmentType === 'van_delivery');

    this.container.innerHTML = `
      <div class="card" style="margin-bottom: 24px;">
        <div class="card-header">
          <h3>🚚 Decentralized Van Fleet (Short-Hop Hub-to-Door Delivery)</h3>
          <span class="badge">Hyperlocal Fleet</span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 16px;">
          Small contracted vans execute 10-minute short runs straight out of neighborhood partner shops.
        </p>

        <div class="grid-2">
          ${fleet.map(v => `
            <div style="background: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <h4 style="font-size: 1rem;">🚐 ${v.id} (${v.driver})</h4>
                <span class="badge" style="background: ${v.status === 'available' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)'}; color: ${v.status === 'available' ? 'var(--accent-green)' : 'var(--accent-blue)'};">
                  ${v.status.toUpperCase()}
                </span>
              </div>
              <div style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.6;">
                <div>Plate: <strong>${v.plate}</strong></div>
                <div>Assigned Zone: <strong>${v.currentZone}</strong></div>
                <div>Capacity: <strong>${v.capacityUnits} units</strong></div>
                <div>Current Trip: <strong>${v.currentOrderId || 'Standby'}</strong></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3> Active Van Delivery Dispatches</h3>
          <span class="badge">Pending Trips</span>
        </div>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Client</th>
                <th>Dispatched From Node</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${vanOrders.length === 0 ? `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No van deliveries currently dispatched</td></tr>` : ''}
              ${vanOrders.map(o => {
                const shop = shops.find(s => s.id === o.shopId);
                return `
                  <tr>
                    <td><strong>${o.id}</strong></td>
                    <td>${o.clientName}</td>
                    <td>${shop ? shop.name : o.shopId}</td>
                    <td>
                      <span class="badge" style="background: rgba(245, 158, 11, 0.2); color: var(--accent-amber);">
                        ${o.status}
                      </span>
                    </td>
                    <td>
                      ${o.status !== 'completed' ? `
                        <button class="btn-success btn-small btn-complete-van-delivery" data-id="${o.id}">
                          ✓ Mark Delivered
                        </button>
                      ` : '<span style="color: var(--accent-green); font-weight: 600;">Delivered</span>'}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}
'@ | Set-Content -Path "js/views/FleetView.js" -Encoding UTF8

# 16. js/controllers/TourController.js
@'
import { ProductModel } from '../models/ProductModel.js';
import { InventoryModel } from '../models/InventoryModel.js';
import { OrderModel } from '../models/OrderModel.js';
import { LedgerModel } from '../models/LedgerModel.js';
import { ShopModel } from '../models/ShopModel.js';
import { AdModel } from '../models/AdModel.js';
import { showToast } from '../app.js';

export class TourController {
  constructor(tourView, eventBus) {
    this.tourView = tourView;
    this.eventBus = eventBus;
    this.currentStep = 0;

    this.steps = [
      {
        title: 'Step 1: Producer Pitches a New SKU',
        desc: 'A beverage brand pitches "Cold Cascara Tea (24pk)". Watch it automatically sync to our shop nodes.',
        execute: async () => {
          this.eventBus.emit('navigate-view', 'b2b-portal');

          const pitchedSKU = await ProductModel.addPitch({
            name: 'Sparkling Cascara Cold Tea (Case 24x330ml)',
            brand: 'Levant Roast Co.',
            category: 'Functional Beverages',
            distributorWholesale: 16.0,
            clientPrice: 22.0,
            desc: 'Direct producer pitch via OmniTrade platform.'
          });

          await InventoryModel.addConsignmentDrop('SHOP-01', pitchedSKU.id, 15);
          await InventoryModel.addConsignmentDrop('SHOP-02', pitchedSKU.id, 15);

          showToast(`⚡ Step 1 Done: "${pitchedSKU.name}" pitched and synced across shops!`, 'success');
          this.eventBus.emit('data-updated');
        }
      },
      {
        title: 'Step 2: Partner Shop Intake (Zero Risk)',
        desc: 'Switching to Hamra Express to receive a consignment drop into backroom storage.',
        execute: async () => {
          this.eventBus.emit('navigate-view', 'shop-terminal');
          await InventoryModel.addConsignmentDrop('SHOP-01', 'SKU-COF-01', 10);
          showToast('📥 Step 2 Done: 10 units Arabica Coffee dropped to Hamra Express (Zero risk for shop)!', 'success');
          this.eventBus.emit('data-updated');
        }
      },
      {
        title: 'Step 3: B2C Footfall & Ad Display Revenue',
        desc: 'Walk-in shoppers trigger screen impressions, splitting ad fees directly to the shopkeeper.',
        execute: async () => {
          this.eventBus.emit('navigate-view', 'shop-terminal');
          const ads = await AdModel.getAll();
          if (ads.length > 0) {
            await AdModel.recordImpression(ads[0].id, 100);
            const shopCut = 100 * ads[0].cpmRate * 0.5;
            await ShopModel.addEarnings('SHOP-01', 0, shopCut);
          }
          showToast('📺 Step 3 Done: 100 consumers saw the screen! Shopkeeper earned ad payout.', 'amber');
          this.eventBus.emit('data-updated');
        }
      },
      {
        title: 'Step 4: Client Buys & Picks Up via PIN',
        desc: 'Downtown Cafe orders stock. Order is ready at Hamra Express with instantaneous pickup release.',
        execute: async () => {
          this.eventBus.emit('navigate-view', 'shop-terminal');

          const order = await OrderModel.createOrder({
            clientName: 'Hamra Brew Bar & Cafe',
            shopId: 'SHOP-01',
            productId: 'SKU-COF-01',
            quantity: 3,
            totalPrice: 72.0,
            fulfillmentType: 'pickup'
          });

          await InventoryModel.deductStock('SHOP-01', 'SKU-COF-01', 3);

          const producerCut = 72.0 * 0.75;
          const platformCut = 72.0 * 0.15;
          const shopCut = 72.0 * 0.07;
          const fleetCut = 72.0 * 0.03;

          await LedgerModel.recordTransaction({
            orderId: order.id,
            totalPrice: 72.0,
            producerAmount: producerCut,
            platformMargin: platformCut,
            shopCut: shopCut,
            fleetCut: fleetCut
          });

          await ShopModel.addEarnings('SHOP-01', shopCut, 0);

          showToast(`🤝 Step 4 Done: Order ${order.id} placed! Pickup PIN: ${order.pickupPin}`, 'success');
          this.eventBus.emit('data-updated');
        }
      },
      {
        title: 'Step 5: View Decentralized ERP & Settlement Ledger',
        desc: 'Examine the multi-node inventory matrix and automated financial splits.',
        execute: async () => {
          this.eventBus.emit('navigate-view', 'erp-hub');
          showToast('📑 Step 5 Done: ERP Settlement Ledger auto-split complete!', 'success');
        }
      }
    ];
  }

  init() {
    this.render();
  }

  render() {
    this.tourView.render(this.currentStep, this.steps);
  }

  async next() {
    const currentStepDef = this.steps[this.currentStep];
    if (currentStepDef && currentStepDef.execute) {
      await currentStepDef.execute();
    }
    this.currentStep = (this.currentStep + 1) % this.steps.length;
    this.render();
  }
}
'@ | Set-Content -Path "js/controllers/TourController.js" -Encoding UTF8

# 17. js/controllers/B2BController.js
@'
import { ProductModel } from '../models/ProductModel.js';
import { ShopModel } from '../models/ShopModel.js';
import { OrderModel } from '../models/OrderModel.js';
import { InventoryModel } from '../models/InventoryModel.js';
import { LedgerModel } from '../models/LedgerModel.js';
import { FleetModel } from '../models/FleetModel.js';
import { showToast } from '../app.js';

export class B2BController {
  constructor(view, eventBus) {
    this.view = view;
    this.eventBus = eventBus;
  }

  async render() {
    const products = await ProductModel.getAll();
    const shops = await ShopModel.getAll();
    this.view.render({ products, shops });
    this.bindEvents();
  }

  bindEvents() {
    const pitchForm = document.getElementById('form-pitch-product');
    if (pitchForm) {
      pitchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(pitchForm);
        const newProduct = {
          name: formData.get('name'),
          brand: formData.get('brand'),
          category: formData.get('category'),
          distributorWholesale: parseFloat(formData.get('distributorWholesale')),
          clientPrice: parseFloat(formData.get('clientPrice')),
          desc: 'Direct Producer Pitch'
        };

        const created = await ProductModel.addPitch(newProduct);
        const shops = await ShopModel.getAll();
        for (const s of shops) {
          await InventoryModel.addConsignmentDrop(s.id, created.id, 12);
        }

        showToast(`SKU "${created.name}" accepted and synchronized across ${shops.length} partner shops!`, 'success');
        pitchForm.reset();
        this.eventBus.emit('data-updated');
      });
    }

    document.querySelectorAll('.btn-select-order').forEach((btn) => {
      btn.addEventListener('click', () => {
        const prodIdInput = document.getElementById('order-product-id');
        const prodNameInput = document.getElementById('order-product-name');
        if (prodIdInput && prodNameInput) {
          prodIdInput.value = btn.dataset.id;
          prodNameInput.value = btn.dataset.name;
          showToast(`Selected "${btn.dataset.name}" for checkout.`, 'info');
        }
      });
    });

    const orderForm = document.getElementById('form-client-order');
    if (orderForm) {
      orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const productId = document.getElementById('order-product-id').value;
        const clientName = document.getElementById('order-client-name').value;
        const qty = parseInt(document.getElementById('order-qty').value, 10);
        const shopId = document.getElementById('order-shop-id').value;
        const fulfillmentType = document.getElementById('order-fulfillment-type').value;

        const product = await ProductModel.getById(productId);
        if (!product) {
          showToast('Please select a valid product from the catalog.', 'amber');
          return;
        }

        try {
          await InventoryModel.deductStock(shopId, productId, qty);
        } catch (err) {
          showToast('Insufficient stock at this partner shop! Pick another shop or consign more stock.', 'amber');
          return;
        }

        const totalPrice = product.clientPrice * qty;
        const newOrder = await OrderModel.createOrder({
          clientName,
          shopId,
          productId,
          quantity: qty,
          totalPrice,
          fulfillmentType
        });

        if (fulfillmentType === 'van_delivery') {
          const assignedVan = await FleetModel.assignFirstAvailableVan(newOrder.id);
          if (assignedVan) {
            showToast(`🚚 Van ${assignedVan.id} (${assignedVan.driver}) dispatched for 15-min delivery!`, 'info');
          }
        }

        const producerAmount = totalPrice * 0.75;
        const platformMargin = totalPrice * 0.15;
        const shopCut = totalPrice * 0.07;
        const fleetCut = totalPrice * 0.03;

        await LedgerModel.recordTransaction({
          orderId: newOrder.id,
          totalPrice,
          producerAmount,
          platformMargin,
          shopCut,
          fleetCut
        });

        await ShopModel.addEarnings(shopId, shopCut, 0);

        showToast(`Purchase Confirmed! Order ID: ${newOrder.id} | PIN: ${newOrder.pickupPin}`, 'success');
        this.eventBus.emit('data-updated');
      });
    }
  }
}
'@ | Set-Content -Path "js/controllers/B2BController.js" -Encoding UTF8

# 18. js/controllers/ERPController.js
@'
import { ProductModel } from '../models/ProductModel.js';
import { ShopModel } from '../models/ShopModel.js';
import { InventoryModel } from '../models/InventoryModel.js';
import { LedgerModel } from '../models/LedgerModel.js';
import { AdModel } from '../models/AdModel.js';

export class ERPController {
  constructor(view, eventBus) {
    this.view = view;
    this.eventBus = eventBus;
  }

  async render() {
    const products = await ProductModel.getAll();
    const shops = await ShopModel.getAll();
    const inventory = await InventoryModel.getAll();
    const ledger = await LedgerModel.getAll();
    const ads = await AdModel.getAll();

    this.view.render({ products, shops, inventory, ledger, ads });
  }
}
'@ | Set-Content -Path "js/controllers/ERPController.js" -Encoding UTF8

# 19. js/controllers/ShopController.js
@'
import { ShopModel } from '../models/ShopModel.js';
import { OrderModel } from '../models/OrderModel.js';
import { InventoryModel } from '../models/InventoryModel.js';
import { ProductModel } from '../models/ProductModel.js';
import { AdModel } from '../models/AdModel.js';
import { showToast } from '../app.js';

export class ShopController {
  constructor(view, eventBus) {
    this.view = view;
    this.eventBus = eventBus;
    this.selectedShopId = 'SHOP-01';
    this.activeAdIndex = 0;
  }

  async render() {
    const shops = await ShopModel.getAll();
    const activeShop = shops.find((s) => s.id === this.selectedShopId) || shops[0];
    const orders = await OrderModel.getAll();
    const inventory = await InventoryModel.getAll();
    const products = await ProductModel.getAll();
    const ads = await AdModel.getAll();

    const currentAd = ads[this.activeAdIndex % ads.length] || null;

    this.view.render({
      activeShop,
      shops,
      orders,
      inventory,
      products,
      activeAd: currentAd
    });

    this.bindEvents(ads);
  }

  bindEvents(ads) {
    const selectEl = document.getElementById('terminal-shop-select');
    if (selectEl) {
      selectEl.addEventListener('change', (e) => {
        this.selectedShopId = e.target.value;
        this.render();
      });
    }

    const intakeForm = document.getElementById('form-shop-intake');
    if (intakeForm) {
      intakeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const productId = document.getElementById('intake-product-id').value;
        const qty = parseInt(document.getElementById('intake-qty').value, 10);

        await InventoryModel.addConsignmentDrop(this.selectedShopId, productId, qty);
        showToast(`✓ Received ${qty} consignment units at ${this.selectedShopId}. Zero financial outlay.`, 'success');
        this.eventBus.emit('data-updated');
      });
    }

    document.querySelectorAll('.btn-release-order').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const orderId = btn.dataset.id;
        await OrderModel.completeOrder(orderId);
        showToast(`Order ${orderId} verified & released to client company!`, 'success');
        this.eventBus.emit('data-updated');
      });
    });

    const btnFootfall = document.getElementById('btn-simulate-footfall');
    if (btnFootfall) {
      btnFootfall.addEventListener('click', async () => {
        await this.simulateImpressions();
      });
    }

    const tvScreen = document.querySelector('.digital-screen-tv');
    if (tvScreen && ads.length > 1) {
      tvScreen.style.cursor = 'pointer';
      tvScreen.title = 'Click to switch sponsored B2C campaign';
      tvScreen.onclick = () => {
        this.activeAdIndex = (this.activeAdIndex + 1) % ads.length;
        this.render();
      };
    }
  }

  async simulateImpressions() {
    const ads = await AdModel.getAll();
    if (ads.length > 0) {
      const ad = ads[this.activeAdIndex % ads.length];
      await AdModel.recordImpression(ad.id, 50);
      const earnedAdCut = 50 * ad.cpmRate * 0.5;
      await ShopModel.addEarnings(this.selectedShopId, 0, earnedAdCut);
      showToast(`Simulated 50 B2C shoppers entering the store! +$${earnedAdCut.toFixed(2)} ad payout credited to shopkeeper.`, 'amber');
      this.eventBus.emit('data-updated');
    }
  }
}
'@ | Set-Content -Path "js/controllers/ShopController.js" -Encoding UTF8

# 20. js/controllers/FleetController.js
@'
import { FleetModel } from '../models/FleetModel.js';
import { OrderModel } from '../models/OrderModel.js';
import { ShopModel } from '../models/ShopModel.js';
import { showToast } from '../app.js';

export class FleetController {
  constructor(view, eventBus) {
    this.view = view;
    this.eventBus = eventBus;
  }

  async render() {
    const fleet = await FleetModel.getAll();
    const orders = await OrderModel.getAll();
    const shops = await ShopModel.getAll();
    this.view.render({ fleet, orders, shops });
    this.bindEvents();
  }

  bindEvents() {
    document.querySelectorAll('.btn-complete-van-delivery').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const orderId = btn.dataset.id;
        await OrderModel.completeOrder(orderId);
        await FleetModel.releaseVan(orderId);
        showToast(`Delivery completed for order ${orderId}. Van returned to Available status!`, 'success');
        this.eventBus.emit('data-updated');
      });
    });
  }
}
'@ | Set-Content -Path "js/controllers/FleetController.js" -Encoding UTF8

# 21. js/app.js
@'
import { getDB, seedDatabase } from './db.js';

import { TourView } from './views/TourView.js';
import { B2BPortalView } from './views/B2BPortalView.js';
import { ERPView } from './views/ERPView.js';
import { ShopTerminalView } from './views/ShopTerminalView.js';
import { FleetView } from './views/FleetView.js';

import { TourController } from './controllers/TourController.js';
import { B2BController } from './controllers/B2BController.js';
import { ERPController } from './controllers/ERPController.js';
import { ShopController } from './controllers/ShopController.js';
import { FleetController } from './controllers/FleetController.js';

export function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : type === 'amber' ? 'toast-amber' : ''}`;
  toast.innerHTML = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

class EventBus {
  constructor() {
    this.events = {};
  }
  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((fn) => fn(data));
    }
  }
}

class App {
  constructor() {
    this.eventBus = new EventBus();
    this.activeView = 'b2b-portal';
  }

  async init() {
    await getDB();

    const tourBarEl = document.getElementById('tour-bar');
    const b2bViewEl = document.getElementById('view-b2b-portal');
    const erpViewEl = document.getElementById('view-erp-hub');
    const shopViewEl = document.getElementById('view-shop-terminal');
    const fleetViewEl = document.getElementById('view-fleet-hub');

    const tourView = new TourView(tourBarEl, () => this.tourController.next());
    const b2bView = new B2BPortalView(b2bViewEl);
    const erpView = new ERPView(erpViewEl);
    const shopView = new ShopTerminalView(shopViewEl);
    const fleetView = new FleetView(fleetViewEl);

    this.tourController = new TourController(tourView, this.eventBus);
    this.b2bController = new B2BController(b2bView, this.eventBus);
    this.erpController = new ERPController(erpView, this.eventBus);
    this.shopController = new ShopController(shopView, this.eventBus);
    this.fleetController = new FleetController(fleetView, this.eventBus);

    this.setupNavigation();
    this.setupEvents();

    this.tourController.init();
    await this.refreshCurrentView();
  }

  setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const viewId = btn.dataset.view;
        this.switchView(viewId);
      });
    });

    document.getElementById('btn-seed-reset').addEventListener('click', async () => {
      await seedDatabase();
      await this.refreshCurrentView();
      showToast('Database reset to seed state!', 'success');
    });
  }

  setupEvents() {
    this.eventBus.on('navigate-view', (viewId) => this.switchView(viewId));
    this.eventBus.on('data-updated', () => this.refreshCurrentView());
  }

  switchView(viewId) {
    this.activeView = viewId;

    document.querySelectorAll('.nav-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.view === viewId);
    });

    document.querySelectorAll('.view-panel').forEach((panel) => {
      panel.classList.toggle('active', panel.id === `view-${viewId}`);
    });

    this.refreshCurrentView();
  }

  async refreshCurrentView() {
    switch (this.activeView) {
      case 'b2b-portal':
        await this.b2bController.render();
        break;
      case 'erp-hub':
        await this.erpController.render();
        break;
      case 'shop-terminal':
        await this.shopController.render();
        break;
      case 'fleet-hub':
        await this.fleetController.render();
        break;
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
'@ | Set-Content -Path "js/app.js" -Encoding UTF8

Write-Host "All 21 files created successfully!" -ForegroundColor Green
Write-Host "Run 'npx serve .' and open the URL in your browser." -ForegroundColor Yellow