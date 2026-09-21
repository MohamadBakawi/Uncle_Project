// js/views/ShopTerminalView.js
export class ShopTerminalView {
  constructor(containerEl) {
    this.container = containerEl;
  }

  render({ activeShop, shops, orders, inventory, products, activeAd }) {
    const shopOrders = orders.filter(o => o.shopId === activeShop.id && o.status === 'ready_for_pickup');
    const shopInventory = inventory.filter(i => i.shopId === activeShop.id);

    this.container.innerHTML = `
      <!-- Header -->
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 1.25rem; font-weight: 700; color: #f8fafc; margin-bottom: 6px;">
          Partner Shop Terminal and In-Store Ad Screen
        </h1>
        <p style="font-size: 0.85rem; color: #94a3b8; line-height: 1.5;">
          This terminal demonstrates the dual-purpose nature of the partner shop: the backroom acts as a zero-risk B2B fulfillment hub, while the front checkout counter runs digital ads to monetize walk-in consumer foot traffic.
        </p>
      </div>

      <!-- Node Selector & Real-Time Balance Bar -->
      <div class="card" style="margin-bottom: 24px; padding: 16px 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span class="badge" style="background: #1e293b; color: #38bdf8; border: 1px solid #0284c7;">
              ACTIVE NODE TERMINAL
            </span>
            <select id="terminal-shop-select" class="form-control" style="width: auto; font-weight: 600;">
              ${shops.map(s => `
                <option value="${s.id}" ${s.id === activeShop.id ? 'selected' : ''}>
                  ${s.name} (${s.neighborhood})
                </option>
              `).join('')}
            </select>
          </div>

          <div style="display: flex; gap: 20px; font-family: 'JetBrains Mono', monospace; font-size: 0.82rem;">
            <div>Consignment Holding Paid: <strong style="color: #4ade80;">$${activeShop.earnedHolding.toFixed(2)}</strong></div>
            <div>In-Store Ad Cut Paid: <strong style="color: #facc15;">$${activeShop.earnedAds.toFixed(2)}</strong></div>
          </div>
        </div>
      </div>

      <!-- Section 1: Inbound Consignment Intake -->
      <div class="card">
        <div class="card-header">
          <div>
            <span class="badge" style="background: #1e293b; color: #34d399; border: 1px solid #059669;">
              ACTOR: PARTNER SHOPKEEPER (BACKROOM LOGISTICS)
            </span>
            <h3 style="margin-top: 8px; font-size: 1.05rem;">Consignment Stock Check-In</h3>
          </div>
        </div>

        <div style="background: #0d1424; border-left: 3px solid #10b981; padding: 12px 16px; margin-bottom: 18px; border-radius: 4px;">
          <div style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.5;">
            <strong>Who is acting:</strong> The corner shopkeeper receiving delivery from the distributor's truck.<br>
            <strong>What is happening:</strong> The shopkeeper confirms incoming pallets into local backroom storage.<br>
            <strong>Why:</strong> The shop does not purchase this stock. Inventory risk remains with the big producer. The shop simply holds goods to earn holding fees upon client fulfillment.
          </div>
        </div>

        <form id="form-shop-intake">
          <div style="display: flex; gap: 16px; margin-bottom: 14px;">
            <div class="form-group" style="flex: 2;">
              <label>Select Incoming Product Drop</label>
              <select class="form-control" id="intake-product-id">
                ${products.map(p => `<option value="${p.id}">${p.name} (${p.brand})</option>`).join('')}
              </select>
            </div>
            <div class="form-group" style="flex: 1;">
              <label>Units Received</label>
              <input type="number" class="form-control" id="intake-qty" value="10" min="1" max="100">
            </div>
          </div>

          <button type="submit" class="btn-primary" style="width: 100%; padding: 10px; font-weight: 600;">
            [CONFIRM CONSIGNMENT INTAKE AND UPDATE ERP INVENTORY]
          </button>
        </form>
      </div>

      <!-- Section 2: Order Release (PIN Verification) -->
      <div class="card">
        <div class="card-header">
          <div>
            <span class="badge" style="background: #1e293b; color: #60a5fa; border: 1px solid #2563eb;">
              ACTOR: SHOPKEEPER & BUSINESS CLIENT HANDOVER
            </span>
            <h3 style="margin-top: 8px; font-size: 1.05rem;">Click-and-Collect Order Verification</h3>
          </div>
        </div>

        <div style="background: #0d1424; border-left: 3px solid #3b82f6; padding: 12px 16px; margin-bottom: 18px; border-radius: 4px;">
          <div style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.5;">
            <strong>Who is acting:</strong> The shopkeeper releasing cargo to the visiting business client.<br>
            <strong>What is happening:</strong> The shopkeeper matches the client's 4-digit pickup PIN to release stock.<br>
            <strong>Why:</strong> Guarantees secure chain-of-custody and triggers immediate automated financial payout to the shopkeeper's balance.
          </div>
        </div>

        ${shopOrders.length === 0 ? `
          <div style="padding: 16px; text-align: center; color: #64748b; font-size: 0.85rem; border: 1px dashed #1e293b; border-radius: 6px;">
            No commercial client orders currently awaiting pickup at ${activeShop.name}.
          </div>
        ` : `
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Order Reference</th>
                  <th>Client Company</th>
                  <th>Pickup PIN</th>
                  <th>Handover Action</th>
                </tr>
              </thead>
              <tbody>
                ${shopOrders.map(o => `
                  <tr>
                    <td><strong>${o.id}</strong></td>
                    <td>${o.clientName}</td>
                    <td style="font-family: 'JetBrains Mono', monospace; font-size: 1.1rem; color: #4ade80; font-weight: 700;">
                      ${o.pickupPin}
                    </td>
                    <td>
                      <button class="btn-success btn-small btn-release-order" data-id="${o.id}">
                        [VALIDATE PIN AND RELEASE GOODS]
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>

      <!-- Section 3: In-Store Digital Signage Screen Simulator -->
      <div class="card">
        <div class="card-header">
          <div>
            <span class="badge" style="background: #1e293b; color: #facc15; border: 1px solid #ca8a04;">
              ACTOR: WALK-IN CONSUMERS & ADVERTISERS (FRONT-OF-STORE)
            </span>
            <h3 style="margin-top: 8px; font-size: 1.05rem;">In-Store B2C Digital Signage TV Simulator</h3>
          </div>
        </div>

        <div style="background: #0d1424; border-left: 3px solid #eab308; padding: 12px 16px; margin-bottom: 18px; border-radius: 4px;">
          <div style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.5;">
            <strong>Who is acting:</strong> Regular neighborhood consumers walking into the store to buy everyday groceries.<br>
            <strong>What is happening:</strong> A digital screen mounted at checkout runs high-visibility brand ads.<br>
            <strong>Why:</strong> The partner shop monetizes foot traffic. Every impression generates ad revenue, split between OmniTrade and the shopkeeper.
          </div>
        </div>

        <div class="digital-screen-tv" style="cursor: pointer;" title="Click anywhere on screen to cycle ad campaign">
          <div class="screen-header-ticker">
            <span>BROADCAST SCREEN ID: ${activeShop.adScreenId}</span>
            <span>LOCATION: ${activeShop.name.toUpperCase()}</span>
          </div>

          <div class="ad-display-content">
            <span class="ad-callout" style="font-family: 'JetBrains Mono', monospace; text-transform: uppercase;">
              SPONSORED CAMPAIGN
            </span>
            <h2 id="tv-ad-title" style="margin-top: 12px; font-size: 1.4rem;">${activeAd ? activeAd.title : 'Nitro Blast Energy'}</h2>
            <p id="tv-ad-callout" style="color: #cbd5e1; font-size: 0.9rem;">${activeAd ? activeAd.callout : 'Available cold at the counter!'}</p>
            <div style="font-size: 0.78rem; color: #94a3b8; font-family: 'JetBrains Mono', monospace;">
              Brand Partner: <strong id="tv-ad-brand" style="color: #f8fafc;">${activeAd ? activeAd.brand : 'Nitro Co.'}</strong>
            </div>
            <div style="margin-top: 14px; font-size: 0.72rem; color: #64748b; text-transform: uppercase;">
              [CLICK SCREEN TO SWITCH SPONSORED CAMPAIGN]
            </div>
          </div>

          <div class="screen-footer-metrics">
            <span>Daily Walk-In Footfall: <strong>${activeShop.dailyFootfall} shoppers</strong></span>
            <span id="tv-ad-impressions">Campaign Impressions: <strong>${activeAd ? activeAd.impressionsToday : 0}</strong></span>
          </div>
        </div>

        <div style="margin-top: 16px;">
          <button id="btn-simulate-footfall" class="btn-secondary-outline" style="width: 100%; padding: 10px; font-family: 'JetBrains Mono', monospace;">
            [SIMULATE 50 CONSUMER WALK-INS AND REGISTER AD REVENUE]
          </button>
        </div>
      </div>
    `;
  }
}