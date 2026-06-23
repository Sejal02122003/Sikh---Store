import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext, renderProductImage } from '../context/AppContext';
import {
  Store,
  TrendingUp,
  Package,
  BarChart3,
  Clock,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  FileText,
  Truck,
  Edit2,
  Trash2,
  Settings,
  Plus,
  Minus,
  Send,
  MessageSquare,
  ShieldAlert
} from 'lucide-react';

const VendorDashboard = () => {
  const {
    products,
    adminRules,
    convertPrice,
    setRoute,
    vendors,
    selectedVendor,
    setSelectedVendor,
    orders,
    updateOrderStatus,
    vendorPayouts,
    requestPayout,
    deleteVendorProduct,
    quickUpdateStock,
    messages,
    sendDirectMessage
  } = useContext(AppContext);

  // Tabs inside Dashboard: overview, products, orders, stock, earnings, profile
  const [activeSubTab, setActiveSubTab] = useState('overview');

  // Profile edit states
  const [phoneEdit, setPhoneEdit] = useState('+91 98765-43210');
  const [emailEdit, setEmailEdit] = useState('contact@artisanpartner.com');
  const [descEdit, setDescEdit] = useState('Providing authentic, hand-crafted products to the global Sikh community.');

  // Messaging sub-tab states
  const [activePartner, setActivePartner] = useState('');
  const [chatTextInput, setChatTextInput] = useState('');
  const chatEndRef = useRef(null);

  // Messaging filtering & actions
  const vendorMessages = messages.filter(m => 
    m.sender === selectedVendor || m.receiver === selectedVendor
  );

  const conversationPartners = Array.from(new Set(
    vendorMessages.map(m => m.sender === selectedVendor ? m.receiver : m.sender)
  )).filter(partner => partner !== selectedVendor && partner !== 'customer');

  const activeChatMessages = vendorMessages.filter(m => 
    (m.sender === selectedVendor && m.receiver === activePartner) ||
    (m.sender === activePartner && m.receiver === selectedVendor)
  );

  const vendorQuickReplies = [
    'Waheguru ji ka Khalsa! Your order has been dispatched.',
    'Yes, we custom dye/craft to your exact preferences.',
    'International delivery usually takes 5-8 business days.',
    'Akal Sahai! We are checking stock and will update you shortly.'
  ];

  const handleVendorSendMessage = (text = chatTextInput) => {
    if (!text.trim()) return;
    if (!activePartner) {
      alert('Please select a customer to chat.');
      return;
    }
    sendDirectMessage(selectedVendor, selectedVendor, activePartner, text.trim());
    setChatTextInput('');
  };

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activePartner, activeSubTab]);

  // Set active partner dynamically based on selected vendor
  useEffect(() => {
    const updatedMessages = messages.filter(m => 
      m.sender === selectedVendor || m.receiver === selectedVendor
    );
    const updatedPartners = Array.from(new Set(
      updatedMessages.map(m => m.sender === selectedVendor ? m.receiver : m.sender)
    )).filter(partner => partner !== selectedVendor && partner !== 'customer');
    
    if (updatedPartners.length > 0) {
      setActivePartner(updatedPartners[0]);
    } else {
      setActivePartner('');
    }
  }, [selectedVendor]);

  const vendorProducts = products.filter(p => p.vendor === selectedVendor);
  const vendorOrders = orders.filter(o => o.vendor === selectedVendor);
  const payouts = vendorPayouts.filter(p => p.vendor === selectedVendor);

  // Calculate stats based on real/mock data in context
  const totalSalesUSD = vendorOrders.reduce((acc, o) => acc + (o.price * o.qty), 0);
  const totalOrdersCount = vendorOrders.length;

  // Dynamic Views counter based on product titles
  const totalViews = vendorProducts.length * 75;

  const commissionPaid = totalSalesUSD * (adminRules.commissionRate / 100);
  const netEarnings = totalSalesUSD - commissionPaid;

  // Calculate payout calculations
  const totalPayoutRequested = payouts.reduce((acc, p) => acc + p.amount, 0);
  const unpaidBalance = Math.max(0, netEarnings - totalPayoutRequested);

  const handlePayoutRequest = () => {
    if (unpaidBalance <= 0) {
      alert('You have no unpaid balance to disburse at this time.');
      return;
    }
    requestPayout(selectedVendor, unpaidBalance);
    alert(`Payout of ${convertPrice(unpaidBalance)} requested successfully! Funds will be reviewed by admin.`);
  };

  const handleEditProduct = (productId) => {
    // Navigate to inventory page with the product ID to allow editing
    setRoute('vendor-inventory', productId);
  };

  return (
    <div className="container page-fade-in" style={{ paddingTop: '2.5rem' }}>

      {/* Header and profile switcher */}
      <div className="flex-between" style={{ marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="section-title" style={{ marginBottom: 0 }}>Vendor Portal</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            Manage listings, process international customer orders, adjust inventory, and request payout balances.
          </p>
        </div>

        {/* Dynamic Vendor Profile switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Select Store:</span>
          <select
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
            className="form-input"
            style={{ width: '220px', padding: '0.5rem 0.75rem', fontSize: '0.9rem' }}
          >
            {vendors.map((vName, idx) => (
              <option key={idx} value={vName}>{vName}</option>
            ))}
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
          <h3 style={{ fontSize: '1.75rem', fontWeight: '800' }}>{convertPrice(totalSalesUSD)}</h3>
          <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>From {totalOrdersCount} checkouts</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="flex-between">
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 'bold', textTransform: 'uppercase' }}>Commission Fee</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-hover)', fontWeight: 'bold' }}>{adminRules.commissionRate}% rate</span>
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-error)' }}>{convertPrice(commissionPaid)}</h3>
          <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>Deducted by platform administrator</p>
        </div>

        <div className="card card-gold" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="flex-between">
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 'bold', textTransform: 'uppercase' }}>Net Balance Payout</span>
            <BarChart3 size={16} style={{ color: 'var(--color-gold-hover)' }} />
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-navy)' }}>{convertPrice(unpaidBalance)}</h3>
          <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>Available to disburse to bank</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="flex-between">
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 'bold', textTransform: 'uppercase' }}>Active Listings</span>
            <Package size={16} style={{ color: 'var(--color-blue-accent)' }} />
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: '800' }}>{vendorProducts.length} Items</h3>
          <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>In global discoverable search</p>
        </div>

      </div>

      {/* Tabs navigation */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--color-beige-dark)', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {[
          { id: 'overview', label: 'Store Overview' },
          { id: 'products', label: 'Listings Manager' },
          { id: 'orders', label: `Orders Pipeline (${vendorOrders.filter(o => o.status !== 'shipped').length})` },
          { id: 'stock', label: 'Stock Manager' },
          { id: 'messages', label: 'Customer Chats' },
          { id: 'earnings', label: 'Earnings & Payouts' },
          { id: 'profile', label: 'Store Profile' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className="btn btn-sm"
            style={{
              background: activeSubTab === tab.id ? 'var(--color-navy)' : 'transparent',
              color: activeSubTab === tab.id ? '#FFFFFF' : 'var(--color-navy)',
              border: activeSubTab === tab.id ? '1px solid var(--color-navy)' : '1px solid transparent',
              borderRadius: 'var(--border-radius-sm)',
              fontWeight: '700'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SUB-TABS CONTENT */}

      {/* 1. OVERVIEW TAB */}
      {activeSubTab === 'overview' && (
        <div className="page-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>

          {/* Product performance */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-beige-dark)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <TrendingUp size={18} style={{ color: 'var(--color-gold-hover)' }} />
              Product Performance Indicators
            </h3>

            {vendorProducts.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                No active products listed. Click "Listings Manager" tab to add.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {vendorProducts.map((p) => {
                  // Generate visual performance numbers
                  const pOrders = vendorOrders.filter(o => o.product === p.title);
                  const pSalesCount = pOrders.reduce((acc, o) => acc + o.qty, 0);
                  const pRevenue = pSalesCount * p.price;
                  const pViews = 45 + (p.id * 15);

                  return (
                    <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 80px 80px 100px', gap: '1rem', alignItems: 'center', padding: '0.75rem', background: 'var(--color-bg)', border: '1px solid var(--color-beige-dark)', borderRadius: 'var(--border-radius-sm)' }}>
                      <div style={{ height: '50px', background: 'var(--color-navy)', borderRadius: '4px', overflow: 'hidden' }}>
                        {renderProductImage(p)}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: '800' }}>{p.title}</h4>
                        <span className="badge badge-gold" style={{ fontSize: '0.6rem' }}>{p.category}</span>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Views</p>
                        <p style={{ fontSize: '0.85rem', fontWeight: '700' }}>{pViews}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Orders</p>
                        <p style={{ fontSize: '0.85rem', fontWeight: '700' }}>{pSalesCount}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Revenue</p>
                        <p style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--color-navy)' }}>{convertPrice(pRevenue)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Orders Overview */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-beige-dark)', paddingBottom: '0.75rem' }}>
              Pending Fulfillment ({vendorOrders.filter(o => o.status !== 'shipped').length})
            </h3>

            {vendorOrders.filter(o => o.status !== 'shipped').length === 0 ? (
              <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                All orders have been shipped! No pending tasks.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {vendorOrders.filter(o => o.status !== 'shipped').map((o) => (
                  <div key={o.id} style={{ padding: '0.75rem', border: '1px solid var(--color-beige-dark)', borderRadius: 'var(--border-radius-sm)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div className="flex-between">
                      <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Order #{o.id}</span>
                      <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>{o.status}</span>
                    </div>
                    <div>
                      <h5 style={{ fontSize: '0.85rem', fontWeight: '700' }}>{o.product}</h5>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                        Quantity: <strong>{o.qty}</strong> • Destination: <strong>{o.destination}</strong>
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveSubTab('orders')}
                      className="btn btn-secondary btn-sm"
                      style={{ marginTop: '0.25rem', width: '100%', fontSize: '0.7rem' }}
                    >
                      Process Fulfillment
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* 2. LISTINGS TAB */}
      {activeSubTab === 'products' && (
        <div className="card page-fade-in" style={{ padding: '1.5rem' }}>
          <div className="flex-between" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-beige-dark)', paddingBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Store size={18} style={{ color: 'var(--color-gold-hover)' }} />
              Marketplace Listings Index
            </h3>

            <button
              onClick={() => setRoute('vendor-inventory')}
              className="btn btn-gold btn-sm"
            >
              <Plus size={14} /> Add Product Listing
            </button>
          </div>

          {vendorProducts.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              No products found for this vendor. Click "Add Product Listing" to list items in our global catalog.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {vendorProducts.map((p) => (
                <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 100px 100px 120px', gap: '1.5rem', alignItems: 'center', padding: '0.75rem', background: 'var(--color-bg)', border: '1px solid var(--color-beige-dark)', borderRadius: 'var(--border-radius-sm)' }}>
                  <div style={{ height: '60px', background: 'var(--color-navy)', borderRadius: '4px', overflow: 'hidden' }}>
                    {renderProductImage(p)}
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
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => handleEditProduct(p.id)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.4rem', borderRadius: '4px' }}
                      title="Edit Item"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete ${p.title}?`)) {
                          deleteVendorProduct(p.id);
                        }
                      }}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.4rem', borderRadius: '4px', color: 'var(--color-error)' }}
                      title="Delete Item"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. ORDERS PIPELINE TAB */}
      {activeSubTab === 'orders' && (
        <div className="card page-fade-in" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-beige-dark)', paddingBottom: '0.75rem' }}>
            International Orders Fulfillment Pipeline
          </h3>

          {vendorOrders.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              No orders have been placed for your items yet.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {vendorOrders.map((o) => {
                const nextStatuses = {
                  'pending': { label: 'Accept & Verify Order', next: 'processing', style: 'btn-gold' },
                  'processing': { label: 'Mark as Packed', next: 'packed', style: 'btn-gold' },
                  'packed': { label: 'Ship & Generate Customs Labels', next: 'shipped', style: 'btn-primary' }
                };

                const currentAction = nextStatuses[o.status];

                return (
                  <div key={o.id} style={{ border: '1px solid var(--color-beige-dark)', borderRadius: 'var(--border-radius-md)', padding: '1.25rem', background: 'var(--color-bg)', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
                    <div>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Order #{o.id}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>• Date: {o.date}</span>
                        <span className={`badge ${o.status === 'shipped' ? 'badge-green' : 'badge-gold'}`} style={{ fontSize: '0.65rem', marginLeft: 'auto' }}>
                          {o.status}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--color-navy)', marginTop: '0.5rem' }}>{o.product}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
                        Customer: <strong>{o.customerName}</strong> • Qty: <strong>{o.qty}</strong> • Price: <strong>{convertPrice(o.price)}</strong>
                      </p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                        Destination: <strong>{o.destination}</strong> (International exchange)
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                      {currentAction ? (
                        <button
                          onClick={() => {
                            updateOrderStatus(o.id, currentAction.next);
                            alert(`Order #${o.id} status updated to: ${currentAction.next}!`);
                          }}
                          className={`btn btn-sm ${currentAction.style}`}
                          style={{ width: '100%', padding: '0.6rem 1rem' }}
                        >
                          {currentAction.label}
                        </button>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'flex-end' }}>
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <CheckCircle2 size={16} /> Dispatched
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Truck size={13} /> Customs verified
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 4. STOCK MANAGER TAB */}
      {activeSubTab === 'stock' && (
        <div className="card page-fade-in" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-beige-dark)', paddingBottom: '0.75rem' }}>
            Inventory Levels & Low Stock Audits
          </h3>

          {vendorProducts.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              No listings to manage stock level.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {vendorProducts.map((p) => {
                const isLow = p.stock < 10;
                return (
                  <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '60px 1.5fr 1fr 1.2fr', gap: '1.5rem', alignItems: 'center', padding: '0.75rem', background: 'var(--color-bg)', border: '1px solid var(--color-beige-dark)', borderRadius: 'var(--border-radius-sm)' }}>
                    <div style={{ height: '60px', background: 'var(--color-navy)', borderRadius: '4px', overflow: 'hidden' }}>
                      {renderProductImage(p)}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '800' }}>{p.title}</h4>
                      <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>{p.category}</span>
                    </div>

                    {/* Status Alert Indicator */}
                    <div>
                      {isLow ? (
                        <span className="badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)', display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.7rem' }}>
                          <AlertTriangle size={12} /> Low Stock Warning
                        </span>
                      ) : (
                        <span className="badge badge-green" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.7rem' }}>
                          <CheckCircle2 size={12} /> In Stock
                        </span>
                      )}
                    </div>

                    {/* Stock adjustments inline */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => quickUpdateStock(p.id, p.stock - 1)}
                        className="btn btn-secondary btn-icon"
                        style={{ width: '28px', height: '28px', padding: 0 }}
                        title="Reduce Stock"
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ fontSize: '1rem', fontWeight: '850', minWidth: '35px', textAlign: 'center' }}>
                        {p.stock}
                      </span>
                      <button
                        onClick={() => quickUpdateStock(p.id, p.stock + 1)}
                        className="btn btn-secondary btn-icon"
                        style={{ width: '28px', height: '28px', padding: 0 }}
                        title="Add Stock"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 5. EARNINGS & PAYOUTS TAB */}
      {activeSubTab === 'earnings' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }} className="page-fade-in">

          {/* Payout Log */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-beige-dark)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FileText size={18} style={{ color: 'var(--color-gold-hover)' }} />
              Payout Ledger History
            </h3>

            {payouts.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                No payout transactions recorded yet.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {payouts.map((pay) => (
                  <div key={pay.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', border: '1px solid var(--color-beige-dark)', borderRadius: 'var(--border-radius-sm)', background: 'var(--color-bg)' }}>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Disbursement {pay.id}</p>
                      <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>Requested: {pay.date}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--color-navy)' }}>{convertPrice(pay.amount)}</p>
                      <span className={`badge ${pay.status === 'Completed' ? 'badge-green' : 'badge-gold'}`} style={{ fontSize: '0.55rem' }}>
                        {pay.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Earnings calculator and Request Payout */}
          <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid var(--color-beige-dark)', paddingBottom: '0.75rem' }}>
              Payout Disbursement
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div className="flex-between">
                <span style={{ color: 'var(--color-text-secondary)' }}>Gross Income:</span>
                <span style={{ fontWeight: '600' }}>{convertPrice(totalSalesUSD)}</span>
              </div>
              <div className="flex-between">
                <span style={{ color: 'var(--color-text-secondary)' }}>Platform commission ({adminRules.commissionRate}%):</span>
                <span style={{ fontWeight: '600', color: 'var(--color-error)' }}>-{convertPrice(commissionPaid)}</span>
              </div>
              <div className="flex-between" style={{ borderTop: '1px solid var(--color-beige-dark)', paddingTop: '0.5rem' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Net Earnings:</span>
                <span style={{ fontWeight: '700' }}>{convertPrice(netEarnings)}</span>
              </div>
              <div className="flex-between">
                <span style={{ color: 'var(--color-text-secondary)' }}>Transferred to Bank:</span>
                <span style={{ fontWeight: '600', color: 'var(--color-success)' }}>-{convertPrice(totalPayoutRequested)}</span>
              </div>
              <div className="flex-between" style={{ borderTop: '2px dashed var(--color-beige-dark)', paddingTop: '0.75rem', fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-navy)' }}>
                <span>Unpaid Balance:</span>
                <span>{convertPrice(unpaidBalance)}</span>
              </div>
            </div>

            <button
              onClick={handlePayoutRequest}
              disabled={unpaidBalance <= 0}
              className="btn btn-gold pulse-gold-button"
              style={{ width: '100%', marginTop: '0.5rem', opacity: unpaidBalance <= 0 ? 0.6 : 1, cursor: unpaidBalance <= 0 ? 'not-allowed' : 'pointer' }}
            >
              Request Balance Disburse
            </button>
            <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
              Bank transfers process within 1-2 administrative business days.
            </p>
          </div>

        </div>
      )}

      {/* 6. PROFILE EDIT TAB */}
      {activeSubTab === 'profile' && (
        <div className="card page-fade-in" style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-beige-dark)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Settings size={18} style={{ color: 'var(--color-gold-hover)' }} />
            Business Profile & Identity Settings
          </h3>

          <form onSubmit={(e) => { e.preventDefault(); alert('Business identity profile updated successfully!'); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Store Brand Name</label>
              <input type="text" value={selectedVendor} disabled className="form-input" style={{ backgroundColor: 'var(--color-bg)', cursor: 'not-allowed', opacity: 0.8 }} />
              <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>Registered with administration. Contact support to request name changes.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Contact Email</label>
                <input type="email" value={emailEdit} onChange={(e) => setEmailEdit(e.target.value)} className="form-input" required />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Contact Phone</label>
                <input type="text" value={phoneEdit} onChange={(e) => setPhoneEdit(e.target.value)} className="form-input" required />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Public Store Description</label>
              <textarea value={descEdit} onChange={(e) => setDescEdit(e.target.value)} rows={3} className="form-input" style={{ resize: 'vertical' }} required />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'var(--color-bg)', padding: '1rem', border: '1px solid var(--color-beige-dark)', borderRadius: 'var(--border-radius-sm)', fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 'bold' }}>
              <CheckCircle2 size={16} />
              <span>Identity status: Verified & Approved Artisan (Disbursement active)</span>
            </div>

            <button type="submit" className="btn btn-navy" style={{ alignSelf: 'flex-end', backgroundColor: 'var(--color-navy)', color: '#FFFFFF', marginTop: '0.5rem' }}>
              Save Profile Details
            </button>

          </form>
        </div>
      )}

      {/* 7. CUSTOMER CHATS SUB-TAB (RESPONSIVE) */}
      {activeSubTab === 'messages' && (
        <div className="card page-fade-in" style={{ padding: 0, overflow: 'hidden', minHeight: '550px', display: 'flex', flexWrap: 'wrap', border: '1px solid var(--color-beige-dark)', borderRadius: 'var(--border-radius-md)', marginBottom: '2rem' }}>
          
          {/* Left panel: active chat list */}
          <div style={{ width: '260px', flexGrow: 1, borderRight: '1px solid var(--color-beige-dark)', display: 'flex', flexDirection: 'column', background: 'rgba(249, 246, 240, 0.4)' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-beige-dark)', background: '#FFFFFF' }}>
              <h4 style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
                <MessageSquare size={16} style={{ color: 'var(--color-gold)' }} />
                Customer Inboxes
              </h4>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem', maxHeight: '500px' }}>
              {conversationPartners.length === 0 ? (
                <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>
                  No customer conversations found.
                </div>
              ) : (
                conversationPartners.map((partner) => {
                  const isActive = activePartner === partner;
                  const threadMsgs = vendorMessages.filter(m => 
                    (m.sender === selectedVendor && m.receiver === partner) || 
                    (m.sender === partner && m.receiver === selectedVendor)
                  );
                  const lastMsg = threadMsgs[threadMsgs.length - 1];

                  return (
                    <div 
                      key={partner}
                      onClick={() => setActivePartner(partner)}
                      style={{ 
                        padding: '0.75rem', 
                        borderRadius: 'var(--border-radius-sm)', 
                        cursor: 'pointer',
                        background: isActive ? 'var(--color-beige-dark)' : 'transparent',
                        border: '1px solid transparent',
                        borderColor: isActive ? 'var(--color-gold)' : 'transparent',
                        marginBottom: '0.3rem',
                        transition: 'var(--transition-smooth)'
                      }}
                    >
                      <div className="flex-between">
                        <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-navy)' }}>
                          {partner}
                        </span>
                        <span style={{ fontSize: '0.6rem', color: 'var(--color-text-secondary)' }}>
                          {lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden', marginTop: '0.15rem' }}>
                        {lastMsg ? lastMsg.text : 'Click to send message...'}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right panel: Chat messages window */}
          <div style={{ flex: 2, minWidth: '300px', display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
            {activePartner ? (
              <>
                <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-beige-dark)', display: 'flex', alignItems: 'center', background: 'rgba(249, 246, 240, 0.2)' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--color-navy)', margin: 0 }}>{activePartner}</h4>
                    <span style={{ fontSize: '0.65rem', color: 'var(--color-success)', fontWeight: 'bold' }}>
                      Private Customer Chat Routing
                    </span>
                  </div>
                </div>

                {/* Message list */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: '#FAF9F6', maxHeight: '350px' }}>
                  {activeChatMessages.length === 0 ? (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                      <MessageSquare size={32} style={{ color: 'var(--color-gold)' }} />
                      <p>Start conversation with {activePartner}</p>
                    </div>
                  ) : (
                    activeChatMessages.map((msg) => {
                      const isMe = msg.senderName === selectedVendor;
                      return (
                        <div 
                          key={msg.id}
                          style={{ 
                            alignSelf: isMe ? 'flex-end' : 'flex-start',
                            maxWidth: '75%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: isMe ? 'flex-end' : 'flex-start'
                          }}
                        >
                          <div style={{ 
                            background: isMe ? 'var(--color-navy)' : '#FFFFFF', 
                            color: isMe ? '#FFFFFF' : 'var(--color-text-primary)',
                            padding: '0.6rem 0.9rem', 
                            borderRadius: isMe ? '12px 12px 0 12px' : '12px 12px 12px 0',
                            border: isMe ? 'none' : '1px solid var(--color-beige-dark)',
                            fontSize: '0.8rem',
                            lineHeight: '1.4'
                          }}>
                            {msg.text}
                          </div>
                          <span style={{ fontSize: '0.6rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      );
                    })
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Quick replies */}
                <div style={{ padding: '0.5rem', background: 'rgba(249, 246, 240, 0.4)', borderTop: '1px solid var(--color-beige-dark)', display: 'flex', gap: '0.4rem', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                  {vendorQuickReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleVendorSendMessage(reply)}
                      style={{
                        padding: '0.3rem 0.6rem',
                        background: '#FFFFFF',
                        border: '1px solid var(--color-beige-dark)',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        cursor: 'pointer',
                        color: 'var(--color-navy)',
                        flexShrink: 0
                      }}
                    >
                      {reply}
                    </button>
                  ))}
                </div>

                {/* Input block */}
                <div style={{ padding: '0.75rem', borderTop: '1px solid var(--color-beige-dark)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    value={chatTextInput}
                    onChange={(e) => setChatTextInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleVendorSendMessage()}
                    placeholder={`Type message to ${activePartner}...`}
                    className="form-input"
                    style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
                  />
                  <button 
                    onClick={() => handleVendorSendMessage()}
                    className="btn btn-gold"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                  >
                    <Send size={13} />
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', color: 'var(--color-text-secondary)', padding: '2rem 0' }}>
                <MessageSquare size={32} style={{ color: 'var(--color-gold)' }} />
                <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--color-navy)', margin: 0 }}>Select a Conversation</h4>
                <p style={{ fontSize: '0.75rem' }}>Select an inbox from the left panel to reply to customer inquiries.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default VendorDashboard;
