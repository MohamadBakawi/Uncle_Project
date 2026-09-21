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
