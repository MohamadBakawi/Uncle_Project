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
