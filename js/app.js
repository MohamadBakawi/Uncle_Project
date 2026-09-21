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
