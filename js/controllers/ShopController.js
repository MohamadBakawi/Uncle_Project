// js/controllers/ShopController.js
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
        showToast(`[INTAKE COMPLETE] Received ${qty} units of consignment stock at ${this.selectedShopId}. Zero financial liability.`, 'success');
        this.eventBus.emit('data-updated');
      });
    }

    document.querySelectorAll('.btn-release-order').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const orderId = btn.dataset.id;
        await OrderModel.completeOrder(orderId);
        showToast(`[ORDER RELEASED] Order ${orderId} verified by PIN and handed over to client.`, 'success');
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
      showToast(`[AD IMPRESSIONS] 50 walk-in shoppers registered. +$${earnedAdCut.toFixed(2)} ad revenue credited to shopkeeper.`, 'amber');
      this.eventBus.emit('data-updated');
    }
  }
}