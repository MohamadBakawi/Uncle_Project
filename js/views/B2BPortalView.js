export class B2BPortalView {
  constructor(containerEl) {
    this.container = containerEl;
  }

  render({ products, shops }) {
    this.container.innerHTML = `
      <div class="grid-2" style="margin-bottom: 24px;">
        <div class="card">
          <div class="card-header">
            <h3> Producer Pitch Portal (Save Salesman Time)</h3>
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
              Pitch SKU & Auto-Sync to Hyperlocal Nodes
            </button>
          </form>
        </div>

        <div class="card">
          <div class="card-header">
            <h3>Salesman Route Replacement ROI</h3>
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
             <strong>How it works:</strong> The producer no longer needs a fleet of salesmen cold-visiting stores. They pitch once; our unified portal exposes their product to commercial buyers, backed by our partner shops holding consignment inventory.
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3> Unified B2B Storefront (Client Order & Node Selection)</h3>
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
