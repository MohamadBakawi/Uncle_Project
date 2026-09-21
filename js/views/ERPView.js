// js/views/ERPView.js
export class ERPView {
  constructor(containerEl) {
    this.container = containerEl;
  }

  render({ products, shops, inventory, ledger, ads }) {
    const totalHeldUnits = inventory.reduce((sum, item) => sum + item.qty, 0);
    const totalPlatformProfit = ledger.reduce((sum, entry) => sum + (entry.platformMargin || 0), 0);
    const totalShopHoldingPaid = ledger.reduce((sum, entry) => sum + (entry.shopCut || 0), 0);

    const distributorHubs = [
      { id: 'DIST-01', name: 'Distributor Primary Depot', code: 'HUB-ALPHA', x: 270, y: 195, r: 18 },
      { id: 'DIST-02', name: 'Regional Freight Terminal', code: 'HUB-BETA', x: 570, y: 185, r: 18 }
    ];

    const getStock = (shopId, fallback) => {
      const match = inventory.filter(i => i.shopId === shopId);
      if (match.length === 0) return fallback;
      return match.reduce((sum, i) => sum + i.qty, 0);
    };

    const shopNodes = [
      { id: 'SHOP-01', label: 'Hamra Express', stock: getStock('SHOP-01', 35), x: 130, y: 100 },
      { id: 'SHOP-02', label: 'Achrafieh Bodega', stock: getStock('SHOP-02', 40), x: 710, y: 105 },
      { id: 'SHOP-03', label: 'Verdun QuickMarket', stock: getStock('SHOP-03', 20), x: 420, y: 320 },
      { id: 'SHOP-04', label: 'Ras Beirut Node', stock: 18, x: 120, y: 285 },
      { id: 'SHOP-05', label: 'Badaro Kiosk', stock: 24, x: 420, y: 80 },
      { id: 'SHOP-06', label: 'Mar Mikhael Mart', stock: 30, x: 720, y: 280 },
      { id: 'SHOP-07', label: 'Sassine Depot', stock: 15, x: 580, y: 325 },
      { id: 'SHOP-08', label: 'Clemenceau Point', stock: 22, x: 260, y: 335 }
    ];

    const trunkLinks = [
      [distributorHubs[0], shopNodes[0]],
      [distributorHubs[0], shopNodes[3]],
      [distributorHubs[0], shopNodes[4]],
      [distributorHubs[0], shopNodes[7]],
      [distributorHubs[1], shopNodes[1]],
      [distributorHubs[1], shopNodes[4]],
      [distributorHubs[1], shopNodes[5]],
      [distributorHubs[1], shopNodes[6]],
      [distributorHubs[0], distributorHubs[1]]
    ];

    const meshLinks = [
      [shopNodes[0], shopNodes[4]],
      [shopNodes[0], shopNodes[3]],
      [shopNodes[3], shopNodes[7]],
      [shopNodes[7], shopNodes[2]],
      [shopNodes[4], shopNodes[1]],
      [shopNodes[1], shopNodes[5]],
      [shopNodes[5], shopNodes[6]],
      [shopNodes[6], shopNodes[2]],
      [shopNodes[2], shopNodes[4]]
    ];

    this.container.innerHTML = `
      <!-- Header -->
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 1.25rem; font-weight: 700; color: #f8fafc; margin-bottom: 6px;">
          Central ERP and Logistics Clearinghouse
        </h1>
        <p style="font-size: 0.85rem; color: #94a3b8; line-height: 1.5;">
          This view functions as the master orchestrator. It tracks decentralized inventory across partner shops, visualizes the physical distribution topology, and audits automated per-transaction revenue splits.
        </p>
      </div>

      <!-- Financial Metrics Summary -->
      <div class="card" style="margin-bottom: 24px;">
        <div class="card-header">
          <div>
            <span class="badge" style="background: #1e293b; color: #38bdf8; border: 1px solid #0284c7;">
              NETWORK OPERATIONAL METRICS
            </span>
            <h3 style="margin-top: 8px; font-size: 1.05rem;">Master Aggregations Across All Nodes</h3>
          </div>
        </div>

        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <div class="stat-box" style="flex: 1; min-width: 200px;">
            <span class="title">Total Units Stored on Consignment</span>
            <span class="value">${totalHeldUnits}</span>
            <span class="subtext">Distributed across ${shops.length} partner retail nodes</span>
          </div>
          <div class="stat-box" style="flex: 1; min-width: 200px;">
            <span class="title">Platform Margin Collected</span>
            <span class="value" style="color: #60a5fa;">$${totalPlatformProfit.toFixed(2)}</span>
            <span class="subtext">15% fee per transaction settled</span>
          </div>
          <div class="stat-box" style="flex: 1; min-width: 200px;">
            <span class="title">Shopkeeper Holding Earnings</span>
            <span class="value" style="color: #4ade80;">$${totalShopHoldingPaid.toFixed(2)}</span>
            <span class="subtext">Zero inventory debt or risk for shops</span>
          </div>
        </div>
      </div>

      <!-- Technical Star-Mesh Topology Map -->
      <div class="card" style="margin-bottom: 24px;">
        <div class="card-header">
          <div>
            <span class="badge" style="background: #1e293b; color: #facc15; border: 1px solid #ca8a04;">
              PHYSICAL NETWORK SCHEMATIC
            </span>
            <h3 style="margin-top: 8px; font-size: 1.05rem;">Star-Mesh Distribution Architecture</h3>
          </div>
        </div>

        <div style="background: #0d1424; border-left: 3px solid #eab308; padding: 12px 16px; margin-bottom: 18px; border-radius: 4px;">
          <div style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.5;">
            <strong>Who is acting:</strong> The central logistics routing engine.<br>
            <strong>What is happening:</strong> Visualizes bulk consignment drop routes (solid trunk lines) from big producer depots to neighborhood shops (triangles), and lateral rebalancing routes (dashed mesh lines).<br>
            <strong>Why:</strong> Replaces single-depot urban traffic congestion with resilient decentralized micro-hubs.
          </div>
        </div>

        <div style="width: 100%; background: #090d16; border: 1px solid #1e293b; border-radius: 6px; overflow: hidden;">
          <svg viewBox="0 0 860 410" style="width: 100%; height: auto; display: block; font-family: 'JetBrains Mono', monospace; user-select: none;">
            <defs>
              <pattern id="mesh-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#162032" stroke-width="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#mesh-grid)" />

            <!-- Mesh Links -->
            ${meshLinks.map(([from, to]) => `
              <line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}"
                    stroke="#334155" stroke-width="1.2" stroke-dasharray="3 3" />
            `).join('')}

            <!-- Trunk Lines -->
            ${trunkLinks.map(([from, to]) => `
              <line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}"
                    stroke="#64748b" stroke-width="1.8" />
            `).join('')}

            <!-- Big Yellow Circles (Distributors) -->
            ${distributorHubs.map(hub => `
              <g transform="translate(${hub.x}, ${hub.y})">
                <circle cx="0" cy="0" r="${hub.r}" fill="#eab308" stroke="#ca8a04" stroke-width="2" />
                <circle cx="0" cy="0" r="4" fill="#000" />
                <text x="0" y="-24" text-anchor="middle" font-size="10" font-weight="700" fill="#facc15">
                  ${hub.name.toUpperCase()}
                </text>
                <text x="0" y="-12" text-anchor="middle" font-size="8" fill="#94a3b8">
                  [${hub.code}]
                </text>
              </g>
            `).join('')}

            <!-- Smaller Triangles (Partner Shops) -->
            ${shopNodes.map(node => {
              const size = 9;
              const points = `${node.x},${node.y - size} ${node.x - size},${node.y + size} ${node.x + size},${node.y + size}`;
              return `
                <g>
                  <polygon points="${points}" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" />
                  <text x="${node.x}" y="${node.y + size + 13}" text-anchor="middle" font-size="9" font-weight="600" fill="#e2e8f0">
                    ${node.label}
                  </text>
                  <text x="${node.x}" y="${node.y + size + 23}" text-anchor="middle" font-size="8" fill="#4ade80">
                    ${node.stock} units
                  </text>
                </g>
              `;
            }).join('')}

            <!-- Key / Legend Box -->
            <g transform="translate(16, 16)">
              <rect width="210" height="100" fill="#0f172a" stroke="#334155" stroke-width="1" rx="4" />
              <text x="10" y="16" font-size="9" font-weight="700" fill="#94a3b8" letter-spacing="0.05em">SCHEMATIC LEGEND</text>

              <circle cx="18" cy="34" r="6" fill="#eab308" stroke="#ca8a04" stroke-width="1.2" />
              <text x="32" y="37" font-size="8.5" fill="#f8fafc">Big Distributor Hub</text>

              <polygon points="18,48 13,58 23,58" fill="#0284c7" stroke="#38bdf8" stroke-width="1" />
              <text x="32" y="56" font-size="8.5" fill="#f8fafc">Partner Shop Holding Node</text>

              <line x1="12" y1="73" x2="24" y2="73" stroke="#64748b" stroke-width="2" />
              <text x="32" y="76" font-size="8.5" fill="#94a3b8">Consignment Inbound Route</text>

              <line x1="12" y1="87" x2="24" y2="87" stroke="#334155" stroke-width="1.5" stroke-dasharray="3 3" />
              <text x="32" y="90" font-size="8.5" fill="#94a3b8">Lateral Mesh / Van Route</text>
            </g>
          </svg>
        </div>
      </div>

      <!-- Virtual Multi-Node Warehouse Matrix -->
      <div class="card" style="margin-bottom: 24px;">
        <div class="card-header">
          <div>
            <span class="badge" style="background: #1e293b; color: #34d399; border: 1px solid #059669;">
              VIRTUAL INVENTORY ENGINE
            </span>
            <h3 style="margin-top: 8px; font-size: 1.05rem;">Multi-Node Consignment Inventory Matrix</h3>
          </div>
        </div>

        <div style="background: #0d1424; border-left: 3px solid #10b981; padding: 12px 16px; margin-bottom: 18px; border-radius: 4px;">
          <div style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.5;">
            <strong>Who is acting:</strong> Automated inventory ledger.<br>
            <strong>What is happening:</strong> Displays SKU quantities held across independent retail shops.<br>
            <strong>Why:</strong> All stock remains the legal asset of the producer until purchased by a commercial client. Shops carry zero inventory liability.
          </div>
        </div>

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Product Description</th>
                <th>Brand</th>
                ${shops.map(s => `<th>${s.name}<br><small style="color: #64748b;">${s.neighborhood}</small></th>`).join('')}
                <th>Total Network Stock</th>
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
                      return `<td style="font-family: 'JetBrains Mono', monospace; font-weight: 600;">${qty}</td>`;
                    }).join('')}
                    <td style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #38bdf8;">${rowTotal}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Automated Revenue Settlement Ledger -->
      <div class="card">
        <div class="card-header">
          <div>
            <span class="badge" style="background: #1e293b; color: #60a5fa; border: 1px solid #2563eb;">
              FINANCIAL AUDIT TRAIL
            </span>
            <h3 style="margin-top: 8px; font-size: 1.05rem;">Automated Per-Transaction Settlement Split</h3>
          </div>
        </div>

        <div style="background: #0d1424; border-left: 3px solid #3b82f6; padding: 12px 16px; margin-bottom: 18px; border-radius: 4px;">
          <div style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.5;">
            <strong>Who is acting:</strong> ERP automated clearinghouse.<br>
            <strong>What is happening:</strong> When an order is placed, revenue is instantaneously partitioned into 4 accounts: Producer (75%), Platform Margin (15%), Partner Shop Holding (7%), and Local Delivery Fleet (3%).<br>
            <strong>Why:</strong> Eliminates end-of-month manual invoice reconciliation across fragmented retail shops.
          </div>
        </div>

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Order Ref</th>
                <th>Producer Payout (75%)</th>
                <th>OmniTrade Cut (15%)</th>
                <th>Shop Holding Fee (7%)</th>
                <th>Fleet Fee (3%)</th>
              </tr>
            </thead>
            <tbody>
              ${ledger.length === 0 ? `<tr><td colspan="5" style="text-align: center; color: #64748b;">No settled transactions recorded.</td></tr>` : ''}
              ${ledger.map(l => `
                <tr>
                  <td><strong>${l.orderId}</strong></td>
                  <td style="color: #4ade80; font-family: 'JetBrains Mono', monospace;">$${l.producerAmount.toFixed(2)}</td>
                  <td style="color: #60a5fa; font-family: 'JetBrains Mono', monospace;">$${l.platformMargin.toFixed(2)}</td>
                  <td style="color: #facc15; font-family: 'JetBrains Mono', monospace;">$${l.shopCut.toFixed(2)}</td>
                  <td style="font-family: 'JetBrains Mono', monospace; color: #94a3b8;">$${l.fleetCut.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}