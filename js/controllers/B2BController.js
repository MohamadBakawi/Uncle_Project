// js/controllers/B2BController.js
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

        showToast(`[PITCH ACCEPTED] SKU "${created.name}" synchronized across ${shops.length} partner shops.`, 'success');
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
          showToast(`Selected "${btn.dataset.name}" for order placement.`, 'info');
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
          showToast('Insufficient stock at this partner shop. Select another shop or consign more stock.', 'amber');
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
            showToast(`Van ${assignedVan.id} assigned for delivery to ${clientName}.`, 'info');
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

        showToast(`Purchase Confirmed. Order Ref: ${newOrder.id} | Pickup PIN: ${newOrder.pickupPin}`, 'success');
        this.eventBus.emit('data-updated');
      });
    }
  }
}