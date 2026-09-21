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
