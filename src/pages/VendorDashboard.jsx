import React, { useContext, useState } from 'react';
import { AppContext, getProductSvg } from '../context/AppContext';
import { Store, TrendingUp, Package, BarChart3, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

const VendorDashboard = () => {
  const { products, adminRules, convertPrice, setRoute } = useContext(AppContext);
  const [selectedVendor, setSelectedVendor] = useState('Khalsa Steel Crafts');

  const vendorProducts = products.filter(p => p.vendor === selectedVendor);

  // Mock Sales Stats
  const stats = {
    'Khalsa Steel Crafts': { sales: 850, orders: 24, views: 320 },
    'Amritsar Turban House': { sales: 675, orders: 45, views: 512 },
    'Shastar Mandir': { sales: 1200, orders: 16, views: 180 },
    'Sikh Heritage Books': { sales: 500, orders: 20, views: 240 },
    'Singhs Outfitters': { sales: 525, orders: 15, views: 190 }
  };

  const activeStats = stats[selectedVendor] || { sales: 0, orders: 0, views: 0 };
  const commissionPaid = activeStats.sales * (adminRules.commissionRate / 100);
  const netEarnings = activeStats.sales - commissionPaid;

  const mockOrders = [
    { id: '1092', product: 'Classic Hand-Forged Sarbloh Kada', qty: 2, destination: 'Canada', status: 'shipped' },
    { id: '1098', product: 'Damascus Steel Ceremonial Kirpan', qty: 1, destination: 'United Kingdom', status: 'pending' },
    { id: '1102', product: 'Royal Amritsari Turban (Dastar)', qty: 3, destination: 'India', status: 'pending' }
  ].filter(o => {
    // Show orders corresponding to the vendor's items
    if (selectedVendor === 'Khalsa Steel Crafts' && o.product.includes('Kada')) return true;
    if (selectedVendor === 'Shastar Mandir' && o.product.includes('Kirpan')) return true;
    if (selectedVendor === 'Amritsar Turban House' && o.product.includes('Turban')) return true;
    return false;
  });

  return (
    <div className="container page-fade-in" style={{ paddingTop: '2.5rem' }}>
      
      {/* Header and selector */}
      <div className="flex-between" style={{ marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="section-title" style={{ marginBottom: 0 }}>Vendor Portal</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            Track product listings, verify active customer orders, and inspect net sales after platform fees.
          </p>
        </div>

        {/* Vendor profile switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Active Profile:</span>
          <select 
            value={selectedVendor} 
            onChange={(e) => setSelectedVendor(e.target.value)}
            className="form-input"
            style={{ width: '220px', padding: '0.5rem 0.75rem', fontSize: '0.9rem' }}
          >
            <option value="Khalsa Steel Crafts">Khalsa Steel Crafts</option>
            <option value="Amritsar Turban House">Amritsar Turban House</option>
            <option value="Shastar Mandir">Shastar Mandir</option>
            <option value="Sikh Heritage Books">Sikh Heritage Books</option>
            <option value="Singhs Outfitters">Singhs Outfitters</option>
          </select>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="flex-between">
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 'bold', textTransform: 'uppercase' }}>Gross Sales</span>
            <TrendingUp size={16} style={{ color: 'var(--color-success)' }} />
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: '800' }}>{convertPrice(activeStats.sales)}</h3>
          <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>From {activeStats.orders} customer checkouts</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="flex-between">
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 'bold', textTransform: 'uppercase' }}>Admin Commission Paid</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-hover)', fontWeight: 'bold' }}>{adminRules.commissionRate}% rate</span>
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-error)' }}>{convertPrice(commissionPaid)}</h3>
          <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>Retained by platform administrator</p>
        </div>

        <div className="card card-gold" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="flex-between">
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 'bold', textTransform: 'uppercase' }}>Net Earnings</span>
            <BarChart3 size={16} style={{ color: 'var(--color-gold-hover)' }} />
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-navy)' }}>{convertPrice(netEarnings)}</h3>
          <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>Paid out direct to vendor account</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="flex-between">
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 'bold', textTransform: 'uppercase' }}>Active Listings</span>
            <Package size={16} style={{ color: 'var(--color-blue-accent)' }} />
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: '800' }}>{vendorProducts.length} Products</h3>
          <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>In global discoverable search</p>
        </div>

      </div>

      {/* Main content grid split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Left Column: Active Inventory items */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="flex-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--color-beige-dark)', paddingBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Store size={18} style={{ color: 'var(--color-gold-hover)' }} />
              Active Inventory
            </h3>
            
            <button 
              onClick={() => setRoute('vendor-inventory')}
              className="btn btn-gold btn-sm"
            >
              Add New Product
            </button>
          </div>

          {vendorProducts.length === 0 ? (
            <p style={{ padding: '2rem 0', color: 'var(--color-text-secondary)', fontSize: '0.9rem', textAlign: 'center' }}>
              You have no active products listed. Click "Add New Product" to list inventory.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {vendorProducts.map((p) => (
                <div 
                  key={p.id}
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '60px 1fr 100px 100px', 
                    gap: '1rem', 
                    alignItems: 'center',
                    padding: '0.75rem',
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-beige-dark)',
                    borderRadius: 'var(--border-radius-sm)'
                  }}
                >
                  <div style={{ height: '60px', borderRadius: '4px', overflow: 'hidden', background: 'var(--color-navy)' }}>
                    {getProductSvg(p.category, p.title, p.themeColor)}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '800' }}>{p.title}</h4>
                    <span className="badge badge-gold" style={{ fontSize: '0.65rem', marginTop: '0.15rem' }}>{p.category}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Price</p>
                    <p style={{ fontSize: '0.9rem', fontWeight: '800' }}>{convertPrice(p.price)}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Stock</p>
                    <p style={{ fontSize: '0.9rem', fontWeight: '800', color: p.stock > 5 ? 'var(--color-success)' : 'var(--color-error)' }}>
                      {p.stock} units
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Order Alerts */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-beige-dark)', paddingBottom: '0.75rem' }}>
            Recent Orders ({mockOrders.length})
          </h3>

          {mockOrders.length === 0 ? (
            <p style={{ padding: '2rem 0', color: 'var(--color-text-secondary)', fontSize: '0.9rem', textAlign: 'center' }}>
              No active customer orders for your items at this time.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {mockOrders.map((o, idx) => (
                <div 
                  key={idx}
                  style={{ 
                    padding: '0.75rem', 
                    border: '1px solid var(--color-beige-dark)', 
                    borderRadius: 'var(--border-radius-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}
                >
                  <div className="flex-between">
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Order #{o.id}</span>
                    <span className="badge" style={{ 
                      backgroundColor: o.status === 'pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)', 
                      color: o.status === 'pending' ? 'var(--color-warning)' : 'var(--color-success)' 
                    }}>
                      {o.status}
                    </span>
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.85rem', fontWeight: '700' }}>{o.product}</h5>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.15rem' }}>
                      Quantity: <strong>{o.qty}</strong> • Destination: <strong>{o.destination}</strong>
                    </p>
                  </div>
                  {o.status === 'pending' && (
                    <button 
                      onClick={() => alert(`Marked Order #${o.id} as Shipped! Customs labels generated.`)}
                      className="btn btn-gold btn-sm"
                      style={{ width: '100%', marginTop: '0.25rem', fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                    >
                      Process & Ship Order
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default VendorDashboard;
