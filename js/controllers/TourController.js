// js/controllers/TourController.js
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
        actor: 'BIG PRODUCER / BRAND',
        actionText: 'Producer pitches "Sparkling Cascara Cold Tea" online and auto-consigns 15 units to Hamra Express.',
        whyText: 'Eliminates 40 hours of field sales rep driving and bypasses central warehouse dispatch bottlenecks.',
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

          showToast(`[ACTION EXECUTED] Actor: Producer | Pitched "${pitchedSKU.name}" and consigned 15 units to shop nodes.`, 'success');
          this.eventBus.emit('data-updated');
        }
      },
      {
        actor: 'PARTNER SHOPKEEPER',
        actionText: 'Hamra Express confirms intake of 10 incoming consignment units into backroom storage.',
        whyText: 'Partner shops take zero financial risk. They do not buy the stock; they only hold it to earn holding fees.',
        execute: async () => {
          this.eventBus.emit('navigate-view', 'shop-terminal');
          await InventoryModel.addConsignmentDrop('SHOP-01', 'SKU-COF-01', 10);
          showToast('[ACTION EXECUTED] Actor: Shopkeeper | Accepted 10 consignment units into Hamra Express. Shop liability: $0.00.', 'success');
          this.eventBus.emit('data-updated');
        }
      },
      {
        actor: 'WALK-IN CONSUMERS',
        actionText: '100 walk-in shoppers view the checkout screen, incrementing brand impressions and paying the shopkeeper.',
        whyText: 'While B2B cargo sits in back, the front counter monetizes everyday consumer foot-traffic via sponsored brand ads.',
        execute: async () => {
          this.eventBus.emit('navigate-view', 'shop-terminal');
          const ads = await AdModel.getAll();
          if (ads.length > 0) {
            await AdModel.recordImpression(ads[0].id, 100);
            const shopCut = 100 * ads[0].cpmRate * 0.5;
            await ShopModel.addEarnings('SHOP-01', 0, shopCut);
          }
          showToast('[ACTION EXECUTED] Actor: Consumers | 100 screen impressions recorded. Shopkeeper credited ad revenue share.', 'amber');
          this.eventBus.emit('data-updated');
        }
      },
      {
        actor: 'BUSINESS CLIENT & SHOPKEEPER',
        actionText: 'Hamra Brew Bar orders 3 units and redeems them at Hamra Express using a secure 4-digit PIN.',
        whyText: 'Client receives goods in 5 minutes locally. Shop releases stock safely with automated chain-of-custody.',
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

          showToast(`[ACTION EXECUTED] Actor: Client & Shopkeeper | Order ${order.id} placed and ready. Pickup PIN: ${order.pickupPin}.`, 'success');
          this.eventBus.emit('data-updated');
        }
      },
      {
        actor: 'PLATFORM ERP CLEARINGHOUSE',
        actionText: 'The ERP auto-splits transaction funds: 75% Producer, 15% Platform, 7% Shop holding, 3% Fleet.',
        whyText: 'Removes manual invoicing. All decentralized actors are settled automatically on every transaction.',
        execute: async () => {
          this.eventBus.emit('navigate-view', 'erp-hub');
          showToast('[ACTION EXECUTED] Actor: Central ERP | Automated 75/15/7/3 ledger settlement finalized across all nodes.', 'success');
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