// js/views/FleetView.js
export class FleetView {
  constructor(containerEl) {
    this.container = containerEl;
  }

  render({ fleet, orders, shops }) {
    const vanOrders = orders.filter(o => o.fulfillmentType === 'van_delivery');

    this.container.innerHTML = `
      <!-- Header -->
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 1.25rem; font-weight: 700; color: #f8fafc; margin-bottom: 6px;">
          Hyperlocal Van Delivery Fleet
        </h1>
        <p style="font-size: 0.85rem; color: #94a3b8; line-height: 1.5;">
          This view tracks contracted micro-vans executing short-hop deliveries directly out of neighborhood partner shops rather than large trucks navigating traffic from a central mega-depot.
        </p>
      </div>

      <!-- Fleet Overview Cards -->
      <div class="card">
        <div class="card-header">
          <div>
            <span class="badge" style="background: #1e293b; color: #38bdf8; border: 1px solid #0284c7;">
              ACTOR: LOCAL VAN DRIVERS
            </span>
            <h3 style="margin-top: 8px; font-size: 1.05rem;">Active Delivery Vehicles and Zone Assignments</h3>
          </div>
        </div>

        <div style="background: #0d1424; border-left: 3px solid #38bdf8; padding: 12px 16px; margin-bottom: 18px; border-radius: 4px;">
          <div style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.5;">
            <strong>Who is acting:</strong> Contracted van couriers.<br>
            <strong>What is happening:</strong> Vans pick up pre-staged B2B stock from the nearest partner shop and deliver to local offices or cafes within 15 minutes.<br>
            <strong>Why:</strong> Solves the last-mile problem. Short runs reduce fuel overhead and eliminate citywide gridlock delays.
          </div>
        </div>

        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          ${fleet.map(v => `
            <div style="background: #0b0f19; border: 1px solid #1e293b; border-radius: 6px; padding: 16px; flex: 1; min-width: 260px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <h4 style="font-size: 0.95rem; color: #f8fafc;">${v.id} (${v.driver})</h4>
                <span class="badge" style="background: ${v.status === 'available' ? '#064e3b' : '#1e3a8a'}; color: ${v.status === 'available' ? '#34d399' : '#93c5fd'};">
                  [${v.status.toUpperCase()}]
                </span>
              </div>
              <div style="font-size: 0.8rem; color: #94a3b8; line-height: 1.6; font-family: 'JetBrains Mono', monospace;">
                <div>License Plate: ${v.plate}</div>
                <div>Operational Zone: ${v.currentZone}</div>
                <div>Storage Capacity: ${v.capacityUnits} units</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Active Van Dispatches Table -->
      <div class="card">
        <div class="card-header">
          <div>
            <span class="badge" style="background: #1e293b; color: #facc15; border: 1px solid #ca8a04;">
              DISPATCH QUEUE
            </span>
            <h3 style="margin-top: 8px; font-size: 1.05rem;">Short-Hop Delivery Runs in Progress</h3>
          </div>
        </div>

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Order Ref</th>
                <th>Client Destination</th>
                <th>Dispatched From Shop Node</th>
                <th>Delivery Status</th>
                <th>Driver Confirmation</th>
              </tr>
            </thead>
            <tbody>
              ${vanOrders.length === 0 ? `<tr><td colspan="5" style="text-align: center; color: #64748b;">No short-hop van deliveries currently dispatched.</td></tr>` : ''}
              ${vanOrders.map(o => {
                const shop = shops.find(s => s.id === o.shopId);
                return `
                  <tr>
                    <td><strong>${o.id}</strong></td>
                    <td>${o.clientName}</td>
                    <td>${shop ? shop.name : o.shopId}</td>
                    <td>
                      <span class="badge" style="background: #451a03; color: #fbbf24; border: 1px solid #b45309;">
                        [${o.status.toUpperCase()}]
                      </span>
                    </td>
                    <td>
                      ${o.status !== 'completed' ? `
                        <button class="btn-success btn-small btn-complete-van-delivery" data-id="${o.id}">
                          [CONFIRM CONTACTLESS DELIVERY]
                        </button>
                      ` : '<span style="color: #4ade80; font-family: JetBrains Mono;">[DELIVERED]</span>'}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}